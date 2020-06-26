import { css } from '@emotion/core';
import {
  FONT_LIGHT,
  FONT_BOLD,
  FONT_FAMILY,
  COLOR_WHITE,
  COLOR_DOWNY,
  COLOR_MIDNIGHT,
  COLOR_MIDNIGHT_DARK,
} from 'theme';

export default css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    
    overflow: hidden;

    color: ${COLOR_WHITE};
    line-height: 1.35;
    font-weight: ${FONT_LIGHT};
    font-family: ${FONT_FAMILY};
    background: linear-gradient(${COLOR_MIDNIGHT}, ${COLOR_MIDNIGHT_DARK});

    user-select: none;
  }

  .main {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  a {
    color: ${COLOR_DOWNY};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    font-weight: ${FONT_BOLD};
  }

  small { font-size: 50%; }
  sup, sub { font-size: 6px; }
`;