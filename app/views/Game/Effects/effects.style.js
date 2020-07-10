import { css } from '@emotion/core';
import { EFFECTS } from 'theme';

export default css`
  position: absolute;
  z-index: ${EFFECTS};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;