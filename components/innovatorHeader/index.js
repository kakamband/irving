import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './innovatorHeader.css';

const InnovatorHeader = ({ children, title, color }) => {
  const description = findChildByName('list-description', children);
  const image = findChildByName('image', children);

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.meta}>
            <h1 className={styles.title}>
              {__('35 Innovators Under 35', 'mittr')}
              <span className={styles.inlineTitle}>{title}</span>
            </h1>
            <p className={styles.description}>{description}</p>
          </div>
          {image && <div className={styles.image}>{image}</div>}
        </div>
      </div>
    </header>
  );
};

InnovatorHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

InnovatorHeader.defaultProps = {
  color: '#333333',
};

export default withStyles(styles)(InnovatorHeader);
