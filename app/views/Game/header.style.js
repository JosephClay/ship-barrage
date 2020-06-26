import { css } from '@emotion/core';
import { HEADER, FONT_LIGHT, FONT_LARGE } from 'theme';

export default css`
  position: absolute;
  z-index: ${HEADER};
  top: 0;
  left: 0;
  padding: 20px 25px;
  font-size: ${FONT_LARGE};
  font-weight: ${FONT_LIGHT};
  cursor: pointer;
`;