import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';

// Styles
import styles from './linkTeaser.css';

const LinkTeaser = ({
  deck,
  permalink,
  publishedDate,
  teaseCTA,
  title,
}) => (
  <Link className={styles.wrapper} to={permalink}>
    <h4 className={styles.title}>{title}</h4>
    {deck && <div className={styles.deck}>{deck}</div>}
    {teaseCTA && <div className={styles.teaseCTA}>{teaseCTA}</div>}
    <div className={styles.date}>{publishedDate}</div>
  </Link>
);

LinkTeaser.defaultProps = {
  deck: '',
  teaseCTA: '',
};

LinkTeaser.propTypes = {
  deck: PropTypes.string,
  permalink: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  teaseCTA: PropTypes.string,
  title: PropTypes.string.isRequired,

};

export default withStyles(styles)(LinkTeaser);