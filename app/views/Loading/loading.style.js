import { css } from '@emotion/core';
import {
  LOADING,
  COLOR_WHITE,
  COLOR_MIDNIGHT,
  COLOR_MIDNIGHT_DARK,
} from 'theme';

export default css`
  position: absolute;
  z-index: ${LOADING};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(${COLOR_MIDNIGHT}, ${COLOR_MIDNIGHT_DARK});
`;

export const ring = css`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid ${COLOR_WHITE};
  transform: translate(-50%, -50%);

  &:nth-of-type(1) {
    width: 50px;
    height: 50px;
    opacity: 0.3;
  }
  &:nth-of-type(2) {
    width: 35px;
    height: 35px;
    opacity: 0.2;
  }
  &:nth-of-type(3) {
    width: 25px;
    height: 25px;
    opacity: 0.1;
  }
`;
