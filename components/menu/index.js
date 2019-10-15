import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import styles from './menu.css';
import footerStyles from './footerMenu.css';
import headerStyles from './headerMenu.css';
import topStyles from './topMenu.css';
import sidebarStyles from './sidebarMenu.css';

const Menu = (props) => {
  const {
    children,
    displayTitle,
    themeName,
    title,
    titleLink,
    theme,
  } = props;

  return (
    <div className={className(theme.wrapper, styles[themeName])}>
      {title && displayTitle && (
        <h2 className={theme.title}>
          {titleLink ? (
            <Link className={theme.titleLink} to={titleLink}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h2>
      )}
      <ul className={theme.list}>{children}</ul>
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  displayTitle: PropTypes.bool,
  themeName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleLink: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    list: PropTypes.string,
  }).isRequired,
};

Menu.defaultProps = {
  displayTitle: false,
  titleLink: '',
};

const wrapWithThemes = withThemes('menu', {
  default: styles,
  footer: footerStyles,
  header: headerStyles,
  top: topStyles,
  sidebar: sidebarStyles,
});

const wrapWithStyles = withStyles(styles, footerStyles,
  headerStyles, topStyles);

export default wrapWithThemes(wrapWithStyles(Menu));