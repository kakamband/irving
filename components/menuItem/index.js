/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import { findChildByName } from 'utils/children';
import { withStyles } from 'critical-style-loader/lib';
import styles from './menuItem.css';

const MenuItem = (props) => {
  const {
    children, label, themeName, url,
  } = props;

  const menu = findChildByName('menu', children);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      className={classNames(styles.wrapper, styles[themeName], {
        [styles.hasChildren]: menu,
        [styles.isChildless]: ! menu,
      })}
    >
      {menu ? (
        <button
          onClick={() => setIsExpanded(! isExpanded)}
          type="button"
          aria-expanded={isExpanded}
          className={classNames(styles.parent, {
            [styles.isExpanded]: isExpanded,
          })}
        >
          {label}
        </button>
      ) : (
        <Link className={styles.link} to={url}>
          {label}
        </Link>
      )}
      {isExpanded && menu}
    </li>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(MenuItem);