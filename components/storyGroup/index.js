import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import Eyebrow from '../eyebrow';

// Styles
import styles from './storyGroup.css';

const StoryGroup = ({
  children,
  date,
  eyebrow,
  excerpt,
  permalink,
  title,
}) => (
  <div className={styles.wrap}>
    <div className={styles.meta}>
      <Eyebrow
        customEyebrow={eyebrow.customEyebrow}
        themeName="In Feed"
        topic={eyebrow.content}
        topicLink={eyebrow.link}
        color={eyebrow.color}
      />
      {'' !== date && <time className={styles.timestamp}>{date}</time>}
    </div>
    <h3 className={styles.title}>
      <Link to={permalink}>{title}</Link>
    </h3>
    <div className={styles.excerpt}>
      <p>{excerpt}</p>
    </div>
    {children}
  </div>
);

StoryGroup.defaultProps = {
  eyebrow: {
    color: '#000000',
    content: '',
    customEyebrow: '',
    link: '',
  },
  excerpt: '',
  permalink: '',
};

StoryGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  date: PropTypes.string.isRequired,
  eyebrow: PropTypes.shape({
    link: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
    customEyebrow: PropTypes.string,
  }),
  excerpt: PropTypes.string,
  permalink: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(StoryGroup);