import { css } from '@emotion/core';
import { CREDITS, FONT_TINY } from 'theme';

export default css`
  position: absolute;
  z-index: ${CREDITS};
  bottom: 25px;
  left: 25px;
  font-size: ${FONT_TINY};
`;