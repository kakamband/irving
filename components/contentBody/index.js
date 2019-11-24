import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import {
  actionShowFullStory,
  actionTruncateStory,
} from 'actions/storyActions';
import { connect } from 'react-redux';
import styles from './contentBody.css';

const ContentBody = (props) => {
  const [truncateContent, setTruncation] = useState(false);
  const [contentHeight, setContentHeight] = useState(400);
  const contentRef = useRef();

  const {
    children,
    truncatedCTA,
    wordCount,
    dispatchShowFullStory,
    dispatchTruncateStory,
  } = props;

  const showFullText = () => {
    // Remove the truncation button and height limit.
    setTruncation(false);
    // Update the container's height to be that of the content.
    setContentHeight(
      contentRef.current.getBoundingClientRect().height
    );
  };

  useEffect(() => {
    const { referrer } = document;
    const { location: { origin } } = window;

    const extractHostname = (url) => (new URL(url)).hostname;

    // Check to see if the referrer exists and contains a hostname.
    // If it does, run the `extractHostname` comparison.
    const isOutsideSource = referrer && 0 < referrer.length ?
      extractHostname(referrer) !== extractHostname(origin) :
      false;

    if (0 === truncatedCTA.length) {
      showFullText();
      dispatchShowFullStory();
    } else if (isOutsideSource) {
      setTruncation(true);
      dispatchTruncateStory();
    } else {
      showFullText();
      dispatchShowFullStory();
    }
  }, truncateContent);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        style={{ display: 400 === contentHeight ? 'block' : 'none' }}
      />

      <div
        className={400 === contentHeight ? styles.contentHidden : ''}
        style={{ height: contentHeight }}
        id="content--body"
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>

      {truncateContent && (
        <button
          className={styles.truncationButton}
          type="button"
          onClick={showFullText}
        >
          <strong>{__(`${truncatedCTA}`, 'mittr')}</strong>{' '}
          {__(`${wordCount} words`, 'mittr')}
        </button>
      )}
    </div>
  );
};

ContentBody.defaultProps = {
  truncatedCTA: '',
  dispatchShowFullStory: () => {},
  dispatchTruncateStory: () => {},
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
  truncatedCTA: PropTypes.string,
  wordCount: PropTypes.number.isRequired,
  dispatchShowFullStory: PropTypes.func,
  dispatchTruncateStory: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchShowStory: () => dispatch(actionShowFullStory()),
  dispatchTruncateStory: () => dispatch(actionTruncateStory()),
});
const withRedux = connect(
  undefined,
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(ContentBody));
