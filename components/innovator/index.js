/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './innovator.css';

const Innovator = ({
  name,
  affiliation,
  subtitle,
  age,
  institution,
  cob,
  credit,
  children,
}) => {
  const image = findChildByName('image', children);
  const gutenbergContent = findChildByName('gutenberg-content', children);
  return (
    <li className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.affiliation}>
            {age && <span>{age}</span>}
            {affiliation && <span>{affiliation}</span>}
            {cob && (
              <span>
                {__('Country of birth', 'mittr')}: {cob}
              </span>
            )}
          </div>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.credit}>
            {__('by', 'mittr')}: {credit}
          </div>
        </div>
        <div className={styles.image}>{image}</div>
      </div>
      <div className={styles.article}>{gutenbergContent}</div>
    </li>
  );
};

Innovator.defaultProps = {
  affiliation: '',
  age: '',
  institution: '',
  cob: '',
  credit: '',
};

Innovator.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  name: PropTypes.string.isRequired,
  affiliation: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  age: PropTypes.string,
  institution: PropTypes.string,
  cob: PropTypes.string,
  credit: PropTypes.string,
};

export default withStyles(styles)(Innovator);
