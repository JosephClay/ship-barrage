import { css } from '@emotion/core';
import {
  FONT_LIGHT,
  FONT_LARGE,
  FONT_SMALL,
} from 'theme';

export default css`
  display: block;
  margin-bottom: 20px;
  text-align: center;
  font-size: ${FONT_LARGE};
  font-weight: ${FONT_LIGHT};
`;

export const subtitle = css`
  display: block;
  font-size: ${FONT_SMALL};
`;