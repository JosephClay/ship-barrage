import rgba from 'utils/rgba';
import { css, keyframes } from '@emotion/core';
import { COLOR_DOWNY } from 'theme';

const circleRotate = keyframes`
  from { transform: translate3d(-50%, -50%, 1px) rotate(0deg); }
  to { transform: translate3d(-50%, -50%, 1px) rotate(360deg); }
`;

const radarRotate = keyframes`
  from { transform: translate3d(-50%, 0, 1px) rotate(0deg); }
  to { transform: translate3d(-50%, 0, 1px) rotate(360deg); }
`;

export const circle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  overflow: hidden;

  animation-name: ${circleRotate};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const triangle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  transform-origin: top center;
`;

export const scan = [
  triangle,
  css`
    &:nth-of-type(1) {
      border-width: 0 12vh 40vh 12vh;
      border-color: transparent transparent ${rgba(COLOR_DOWNY, 0.1)} transparent;
      transform: translateX(-50%);
    }

    &:nth-of-type(2) {
      border-width: 0 2vh 40vh 2vh;
      border-color: transparent transparent ${rgba(COLOR_DOWNY, 0.1)} transparent;
      transform: translateX(-50%) rotate(14deg);
    }

    &:nth-of-type(3) {
      border-width: 0 0.5vh 40vh 0.5vh;
      border-color: transparent transparent ${rgba(COLOR_DOWNY, 0.3)} transparent;
      transform: translateX(-50%) rotate(16deg);
    }
  `,
];

export const radar = [
  triangle,
  css`
    border-width: 0 150vh 500vh 150vh;
    border-color: transparent transparent ${rgba(COLOR_DOWNY, 0.05)} transparent;
    transform: translateX(-50%) rotate(0deg);

    animation-name: ${radarRotate};
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  `,
];