import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './teaserItem.css';
import simpleTheme from './teaserItem--simple.css';

const TeaserItem = ({
  children,
  color,
  excerpt,
  permalink,
  postDate,
  teaseCTA,
  theme,
  themeName,
  title,
  topic,
  topicLink,
}) => {
  const image = findChildByName('image', children);
  const otherChildren = children.filter(
    ({ props: componentName }) => 'image' !== componentName
  );
  if ('simple' === themeName) {
    return (
      <Link className={theme.wrapper} to={permalink}>
        <div className={theme.meta}>
          <h3 className={theme.title}>{title}</h3>
          <p className={theme.excerpt}>{excerpt}</p>
        </div>
        {image && <div className={theme.image}>{image}</div>}
      </Link>
    );
  }

  return (
    <article className={theme.wrapper}>
      <div className={theme.meta}>
        {/* @todo review if this title level needs to be dynamic. */}
        <h3 className={theme.title}>
          <Link to={permalink}>{title}</Link>
        </h3>
        <div className={theme.eyebrow}>
          {'' !== topicLink && (
            <Link
              className={theme.eyebrowLink}
              to={topicLink}
              style={{ color }}
            >
              <span className="screen-reader-text">
                {__('Categorized in ', 'mittr')}
              </span>
              {topic}
            </Link>
          )}
          {'' !== postDate && (
            <time className={theme.timestamp}>{postDate}</time>
          )}
        </div>
        <div className={theme.shareMenu}>
          <button
            type="button"
            aria-label={__('Open share menu', 'mittr')}
            className={theme.shareMenuToggle}
          >
            <div className={theme.dot} />
            <div className={theme.dot} />
            <div className={theme.dot} />
          </button>
        </div>
      </div>
      <p className={theme.excerpt}>{excerpt}</p>
      {'' !== teaseCTA && (
        <Link to={permalink} className={theme.callToAction}>
          {teaseCTA}
        </Link>
      )}
      {image && (
        <Link to={permalink} tabIndex="-1" className={theme.image}>
          {image}
        </Link>
      )}
      {otherChildren}
    </article>
  );
};

TeaserItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string,
  excerpt: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  postDate: PropTypes.string,
  teaseCTA: PropTypes.string,
  theme: PropTypes.shape({
    callToAction: PropTypes.string,
    dot: PropTypes.string,
    excerpt: PropTypes.string,
    eyebrow: PropTypes.string,
    eyebrowLink: PropTypes.string,
    image: PropTypes.string,
    meta: PropTypes.string,
    shareMenu: PropTypes.string,
    shareMenuToggle: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
  themeName: PropTypes.string,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string,
  topicLink: PropTypes.string,
};

TeaserItem.defaultProps = {
  themeName: '',
  color: '',
  teaseCTA: '',
  topic: '',
  postDate: '',
  topicLink: '',
};

export default withThemes('teaser-item', {
  default: styles,
  simple: simpleTheme,
})(withStyles(styles)(TeaserItem));
