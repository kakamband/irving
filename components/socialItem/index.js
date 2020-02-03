/**
 * We disable the linter rule react/jsx-no-target-blank
 * rule in this file because the desired behavior for social
 * links is that they are opened with a referer. We instead
 * pass rel="noopener" to the social link so that the social
 * page will not run in the same process as our parent page.
 */

/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import CopyLink from 'components/copyLink';
import socialIconMap from './iconMap';
import styles from './socialItem.css';
import lightIconStyles from './lightIcon.css';
import darkIconStyles from './darkIcons.css';
import flyoutIconStyles from './socialItem--flyoutIcon.css';

const SocialItem = ({
  type, url, displayIcon, theme, themeName,
}) => {
  const IconComponent = socialIconMap[type];
  return (
    <li className={classNames(theme.wrapper, theme[type])}>
      {'link' !== type ? (
        <a
          href={url}
          className={theme.anchor}
          onClick={(e) => {
            e.preventDefault();
            window.open(
              url,
              'socialWindow',
              'width=325,height=400'
            );
          }}
          target="_blank"
          rel="noopener"
        >
          <span className={theme.screenReaderLabel}>
            {type}{__('link opens in a new window', 'mittr')}
          </span>
          {displayIcon && IconComponent && (
            <div className={theme.icon}>
              <IconComponent />
            </div>
          )}
        </a>
      ) : (
        <CopyLink url={url} themeName={themeName} />
      )}
    </li>
  );
};

SocialItem.propTypes = {
  /**
   * What type of service is this? Should correspond to a key in `socialIconMap`
   */
  type: PropTypes.string.isRequired,
  /**
   * Where should this icon take the user?
   */
  url: PropTypes.string.isRequired,
  /**
   * Should the social icon be displayed, or just text?
   */
  displayIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles, lightIconStyles);

const wrapWithThemes = withThemes('social-item', {
  default: styles,
  light: lightIconStyles,
  flyoutIcon: flyoutIconStyles,
  dark: darkIconStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialItem));
