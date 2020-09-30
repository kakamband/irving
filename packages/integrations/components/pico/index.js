/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import getLogService from '@irvingjs/services/logService';
// import isNode from '@irvingjs/core/utils/isNode';
import usePollForNode from './usePollForNode';
import PicoObserver from './observer';
// Pico.
import {
  actionPicoLoaded,
  actionPicoScriptAdded,
  actionUpdatePicoPageInfo,
} from '../../actions/picoActions';
import {
  picoLoadedSelector,
  picoScriptAddedSelector,
} from '../../selectors/picoSelector';
// Coral.
import {
  actionReceiveCoralLogoutRequest,
} from '../../actions/coralActions';
import { tokenSelector } from '../../selectors/coralSelector';
// Utility functions.
import {
  isPicoMounted,
  mountPicoNodes,
} from './utils';

const log = getLogService('irving:pico');

const Pico = (props) => {
  const {
    pageInfo,
    publisherId,
    tiers,
    widgetUrl,
  } = props;

  /**
   * Ensure page info has the right format.
   *
   * @see https://help.trypico.com/en/articles/3199263-installing-pico-on-your-website
   */
  const picoPageInfo = {
    article: ('post' === pageInfo.postType),
    post_id: pageInfo.postId,
    post_type: pageInfo.postType,
    resource_ref: pageInfo.resourceRef,
    taxonomies: pageInfo.taxonomies,
    url: window.location.href,
  };

  // Create a state value that is updated when the `pico-init` event is fired.
  const [picoInitialized, setPicoInitialized] = useState(false);
  // Create the dispatch function.
  const dispatch = useDispatch();
  // Create a function that dispatches the current page info for the saga to respond to.
  const dispatchUpdatePicoPageInfo = useCallback(
    (payload) => dispatch(actionUpdatePicoPageInfo(payload)),
    [dispatch]
  );
  // Create a function that updates the store whenever the script is added.
  const dispatchPicoScriptAdded = useCallback(
    () => dispatch(actionPicoScriptAdded()),
    [dispatch]
  );
  // Create a function that updates the store when the `pico.loaded` event is fired.
  const dispatchPicoLoaded = useCallback(
    () => dispatch(actionPicoLoaded()),
    [dispatch]
  );

  // Grab the `loaded` value from the `pico` branch of the state tree.
  const picoLoaded = useSelector(picoLoadedSelector);

  // Grab the `scriptAdded` value from the `pico` branch of the state tree.
  const picoScriptAdded = useSelector(picoScriptAddedSelector);

  // Retrieve the Coral SSO token from the Redux store.
  const coralToken = useSelector(tokenSelector);

  useEffect(() => {
    const initHandler = () => {
      log.info('Pico: Running init handler.');
      setPicoInitialized(true);
    };

    const loadHandler = () => {
      log.info('Pico: Running load handler.');
      dispatchPicoLoaded();
      log.info('Pico: Dispatching info');
      // dispatchUpdatePicoPageInfo(picoPageInfo);
    };

    log.info('Pico: Event listeners added.');
    // On component hydration, add an event listener to watch for the script's init event.
    window.addEventListener('pico.init', initHandler);
    window.addEventListener('pico.loaded', loadHandler);

    return () => {
      window.removeEventListener('pico.init', initHandler);
      window.removeEventListener('pico.loaded', loadHandler);
    };
  }, [picoInitialized]);

  const widgetContainer = usePollForNode('#pico-widget-container');

  useEffect(() => {
    log.info(
      'Pico: Attempting to mount nodes:',
      [widgetContainer, isPicoMounted(), picoLoaded]
    );

    // Ensure the target nodes are only mounted once on the initial server load.
    if (isPicoMounted() && ! isPicoMounted()) {
      log.info('Pico: Mounting nodes.');
      mountPicoNodes();
    }
  }, [picoLoaded, widgetContainer]);

  if (! picoScriptAdded) {
    log.info('Pico: Adding Widget script.');
    dispatchPicoScriptAdded();

    return (
      <Helmet>
        <script>
          {
            /* eslint-disable max-len */
            `(function(p,i,c,o){var n=new Event("pico-init");i[p]=i[p]||function(){(i[p].queue=i[p].queue||[]).push(arguments)},i.document.addEventListener("pico-init",function(e){var t=i.Pico.getInstance(e,{publisherId:o,picoInit:n},i);t.handleQueueItems(i[p].queue),i[p]=function(){return t.handleQueueItems([arguments])}},!1);var e=i.document.createElement("script"),t=i.document.getElementsByTagName("script")[0];e.async=1,e.defer=1,e.src=c,e.onload=function(e){return i.Pico.getInstance(e,{publisherId:o,picoInit:n},i)},t.parentNode.insertBefore(e,t)})("pico",window,"${widgetUrl}/wrapper.min.js", "${publisherId}");`
            /* eslint-enable */
          }
        </script>
      </Helmet>
    );
  }

  // Inject the Pico Signal into the DOM.
  log.info('Pico: Returning observer component.');
  return (
    <PicoObserver
      tiers={tiers}
      accessToken={coralToken}
      logoutRequestAction={actionReceiveCoralLogoutRequest}
    />
  );
};

Pico.defaultProps = {
  tiers: [],
  widgetUrl: 'https://widget.pico.tools',
};

Pico.propTypes = {
  pageInfo: PropTypes.shape({
    article: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
    resourceRef: PropTypes.string,
    taxonomies: PropTypes.object.isRequired,
  }).isRequired,
  publisherId: PropTypes.string.isRequired,
  tiers: PropTypes.array,
  widgetUrl: PropTypes.string,
};

export default Pico;
