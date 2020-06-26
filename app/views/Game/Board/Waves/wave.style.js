import { css, keyframes } from '@emotion/core';
import { COLOR_WHITE } from 'theme';

const expand = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(3);
  }
`;

export default css`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ripple = css`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${COLOR_WHITE};
  opacity: 0;
  animation-name: ${expand};
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  &:nth-of-type(2) { animation-delay: 200ms; }
  &:nth-of-type(3) { animation-delay: 400ms; }
`;