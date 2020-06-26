import { css } from '@emotion/core';
import { MESSAGES } from 'theme';

export default css`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  z-index: ${MESSAGES};
  bottom: 50px;
  left: 25px;
  height: 0;
`;