import React from 'react';
import PropTypes from 'prop-types';
import useClientNavigationOnClick from
  '@irvingjs/core/hooks/useClientNavigationOnClick';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import { propsToDataAttributes } from '@irvingjs/styled/utils';
import {
  analyticsPropTypes,
  getAnalyticsDefaultProps,
} from '@irvingjs/styled/types/analyticsPropTypes';
import * as defaultStyles from './themes/default';

/**
 * Link.
 *
 * Custom anchor.
 *
 * @todo Setup a default focus value for improved accessibility.
 */
const Link = (props) => {
  const {
    analytics,
    ariaHidden,
    children,
    href,
    onClick,
    rel,
    target,
    theme,
  } = props;
  const {
    onClick: defaultOnClick,
    destination,
  } = useClientNavigationOnClick(href);
  const {
    LinkWrapper,
  } = theme;
  const standardProps = useStandardProps(props);

  return (
    <LinkWrapper
      {...propsToDataAttributes(analytics.click)}
      aria-hidden={'true' === ariaHidden ? ariaHidden : null}
      href={destination}
      onClick={onClick || defaultOnClick}
      rel={rel}
      target={target}
      {...props}
      {...standardProps}
    >
      {children}
    </LinkWrapper>
  );
};

Link.defaultProps = {
  ...getAnalyticsDefaultProps(),
  ...getStandardDefaultProps(),
  ariaHidden: null,
  theme: defaultStyles,
  onClick: false,
  rel: '',
  target: '',
  gtmCategory: '',
  gtmAction: '',
  gtmLabel: '',
  gtmValue: null,
};

Link.propTypes = {
  ...analyticsPropTypes,
  ...standardPropTypes,
  ariaHidden: PropTypes.oneOf([null, 'true']),
  /**
   * Destination for anchor tag (`href` attribute)
   */
  href: PropTypes.string.isRequired,
  /**
   * OnClick function. NOTE: if provided, this will override
   * history push handling, so use with care.
   */
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  /**
   * Rel attribute.
   */
  rel: PropTypes.string,
  /**
   * Anchor target.
   */
  target: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Link as Component,
  themeMap,
};

export default Link;
