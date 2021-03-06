import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import EmbedContainer from 'react-oembed-container';
import { richText } from '@irvingjs/core/config/html';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';
import * as htmlStyles from './themes/html';
import * as responsiveEmbedStyles from './themes/responsiveEmbed';
import * as unstyledStyles from './themes/unstyled';
import * as captionStyles from './themes/caption';
import * as h1Styles from './themes/h1';
import * as h2Styles from './themes/h2';
import * as h3Styles from './themes/h3';
import * as h4Styles from './themes/h4';
import * as h5Styles from './themes/h5';
import * as h6Styles from './themes/h6';

/**
 * Output text.
 */
const Text = (props) => {
  const {
    content,
    html,
    oembed,
    theme,
  } = props;
  const standardProps = useStandardProps(props, {
    tag: 'div',
  });
  const { TextWrapper } = theme;

  switch (true) {
    case ! content.length:
      return false;

    case true === oembed:
      return (
        <EmbedContainer markup={content}>
          <TextWrapper
            {...standardProps}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content, richText) }} // eslint-disable-line react/no-danger, max-len
          />
        </EmbedContainer>
      );

    case true === html:
      return (
        <TextWrapper
          {...standardProps}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content, richText) }} // eslint-disable-line react/no-danger
        />
      );

    default:
      return (
        <TextWrapper
          {...standardProps}
        >
          {content}
        </TextWrapper>
      );
  }
};

Text.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  content: '',
  html: false,
  oembed: false,
};

Text.propTypes = {
  ...standardPropTypes,
  /**
   * Markup to render.
   */
  content: PropTypes.string,
  /**
   * Render as HTML.
   */
  html: PropTypes.bool,
  /**
   * Render oembeds.
   */
  oembed: PropTypes.bool,
};

const themeMap = {
  default: defaultStyles,
  html: htmlStyles,
  responsiveEmbed: responsiveEmbedStyles,
  unstyled: unstyledStyles,
  caption: captionStyles,
  h1: h1Styles,
  h2: h2Styles,
  h3: h3Styles,
  h4: h4Styles,
  h5: h5Styles,
  h6: h6Styles,
};

export {
  Text as Component,
  themeMap,
};

export default Text;
