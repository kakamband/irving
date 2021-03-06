import { css } from 'styled-components';
import { bodyText, caption, link } from './utils';

export const imageBlock = css`
  .wp-block-image {
    ${bodyText};

    figcaption {
      ${caption};

      a {
        ${link};
      }
    }

    img {
      height: auto;
    }
  }
`;
