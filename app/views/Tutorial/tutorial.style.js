import { css } from '@emotion/core';
import {
  FONT_MEDIUM,
  COLOR_SOLID_PINK,
  COLOR_MINE_SHAFT,
} from 'theme';

export default css`
  p {
    margin-bottom: 20px;
    font-size: ${FONT_MEDIUM};
  }

  ol {
    padding-left: 25px;
    margin-bottom: 15px;

    &:last-of-type { margin-bottom: 0; }
  }
    li {
      margin-bottom: 10px;
    }
`;

export const icon = css`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transform: translate(0, 2px);

  &[data-hit] { background: ${COLOR_SOLID_PINK}; }
  &[data-miss] {
    margin-left: 10px;
    background: ${COLOR_MINE_SHAFT};
  }
`;