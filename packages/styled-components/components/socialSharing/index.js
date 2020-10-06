import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import queryString from 'query-string';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  gtmPropTypes,
  getGTMDefaultProps,
} from '@irvingjs/styled/types/gtmPropTypes';
import toReactElement from '@irvingjs/core/utils/toReactElement';
import Link from '../link';
import * as defaultStyles from './themes/default';

/**
 * Social sharing.
 *
 * Displays a list of platforms to share content on.
 */
const SocialSharing = (props) => {
  const {
    description,
    gtmAction,
    gtmCategory,
    imageUrl,
    platforms,
    platformData,
    theme,
    title,
    url,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    IconWrapper,
    SocialSharingItemWrapper,
    SocialSharingList,
    SocialSharingWrapper,
  } = theme;

  const getEmailUrl = `mailto:?${
    queryString.stringify({
      subject: title,
      body: url,
    })
  }`;

  const getFacebookUrl = `https://www.facebook.com/sharer.php?${
    queryString.stringify({
      u: url,
    })
  }`;

  const getLinkedInUrl = `https://www.linkedin.com/shareArticle/?${
    queryString.stringify({
      url,
      title,
      summary: description,
    })
  }`;

  const getPinterestUrl = `https://pinterest.com/pin/create/button?${
    queryString.stringify({
      url,
      media: imageUrl,
      description,
    })
  }`;

  const getRedditUrl = `http://www.reddit.com/submit/?${
    queryString.stringify({
      title,
      url,
    })
  }`;

  const getTwitterUrl = `https://twitter.com/intent/tweet?${
    queryString.stringify({
      text: title,
      url,
    })
  }`;

  const whatsAppStory = sprintf( // Translators: %1$s - article title, %2$s - article url.
    __('Check out this story: %1$s %2$s', 'irving-styled-components'),
    title,
    url
  );

  const getWhatsAppUrl = `https://api.whatsapp.com/send/?${
    queryString.stringify({
      text: whatsAppStory,
    })
  }`;

  if (0 === platforms.length) {
    return null;
  }

  const defaultPlatformData = {
    email: {
      shareUrl: getEmailUrl,
      target: '_self',
    },
    facebook: {
      shareUrl: getFacebookUrl,
      target: '_blank',
    },
    linkedin: {
      shareUrl: getLinkedInUrl,
      target: '_blank',
    },
    pinterest: {
      shareUrl: getPinterestUrl,
      target: '_blank',
    },
    reddit: {
      shareUrl: getRedditUrl,
      target: '_blank',
    },
    twitter: {
      shareUrl: getTwitterUrl,
      target: '_blank',
    },
    whatsapp: {
      shareUrl: getWhatsAppUrl,
      target: '_blank',
    },
  };

  // Combine the default with any custom data.
  const mergedData = { ...defaultPlatformData, ...platformData };

  const allitems = Object.entries(mergedData).map(([platform, data]) => ({
    ...data,
    platform,
    icon: toReactElement({
      name: `irving/${platform}-icon`,
      config: {
        title: sprintf( // Translators: %1$s - platform.
          __('Share on %1$s', 'irving-styled-components'),
          platform
        ),
      },
      children: [],
    }),
  }));

  // Filter to just the enabled platforms.
  const items = allitems.filter((el) => (platforms.includes(el.platform)));

  return (
    <SocialSharingWrapper {...standardProps}>
      <SocialSharingList>
        {items.map(({
          icon,
          platform,
          shareUrl,
          target,
        }) => (
          <SocialSharingItemWrapper key={platform} className={platform}>
            <Link
              data-gtm-category={gtmCategory}
              data-gtm-action={gtmAction}
              data-gtm-label={platform}
              href={shareUrl}
              target={target}
            >
              <IconWrapper className={platform}>
                {icon}
              </IconWrapper>
            </Link>
          </SocialSharingItemWrapper>
        ))}
      </SocialSharingList>
    </SocialSharingWrapper>
  );
};

SocialSharing.defaultProps = {
  ...getGTMDefaultProps(),
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  description: '',
  imageUrl: '',
  platforms: ['email', 'facebook', 'twitter'],
  style: {},
  title: '',
  url: '',
};

SocialSharing.propTypes = {
  ...gtmPropTypes,
  ...standardPropTypes,
  /**
   * Description of the shared content.
   */
  description: PropTypes.string,
  /**
   * Preview image for the shared content.
   */
  imageUrl: PropTypes.string,
  /**
   * An array of social sharing platforms.
   */
  platforms: PropTypes.arrayOf(PropTypes.string),
  /**
   * An object containing social platforms as keys and platform configs as values.
   */
  platformData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Title of the shared content.
   */
  title: PropTypes.string,
  /**
   * URL of the shared content.
   */
  url: PropTypes.string,
};

const themeMap = {
  default: defaultStyles,
};

export {
  SocialSharing as Component,
  themeMap,
};

export default SocialSharing;
