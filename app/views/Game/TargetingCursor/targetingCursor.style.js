import { css, keyframes } from '@emotion/core';
import { CURSOR, COLOR_WHITE } from 'theme';

const circleThrob = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.85); }
`;

const reticuleSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default css`
  position: absolute;
  z-index: ${CURSOR};
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

export const alignment = css`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
`;

export const circle = css`
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  opacity: 0.3;
  border-radius: 50%;
  border: 1px solid ${COLOR_WHITE};

  animation-name: ${circleThrob};
  animation-duration: 2s;
  animation-direction: alternate-reverse;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export const reticules = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.5;

  animation-name: ${reticuleSpin};
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export const reticule = css`
  position: absolute;
  width: 100%;
  height: 100%;

  &:nth-of-type(2) { transform: rotate(90deg); }
  &:nth-of-type(3) { transform: rotate(180deg); }
  &:nth-of-type(4) { transform: rotate(-90deg); }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 50%;
    border-style: solid;
    border-width: 0 3px 12px 3px;
    border-color: transparent transparent ${COLOR_WHITE} transparent;
    transform: translate(-50%, -8px) scale(0.6);
  }
`;