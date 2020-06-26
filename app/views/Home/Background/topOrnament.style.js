import { css } from '@emotion/core';
import { COLOR_WHITE } from 'theme';

export default css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80vh;
  height: 80vh;
  opacity: 0.4;
  margin: -40vh 0 0 -40vh;
  transform-origin: center center;
`;

export const circle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  border: 1px solid ${COLOR_WHITE};
  clip: rect(0, 80vh, 32vh, 0);
`;

export const box = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 1px;
    background: ${COLOR_WHITE};
  }
`;

export const long = css`
  &:before {
    top: -20px;
    clip: rect(0, 20px, 20px, 0);
  }
`;

export const short = css`  
  &:before {
    top: -10px;
    clip: rect(0, 10px, 10px, 0);
  }
`;