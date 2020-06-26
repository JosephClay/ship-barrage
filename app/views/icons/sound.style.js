import { css } from '@emotion/core';

export default css`
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 14px;
  background: currentColor;
  transform: translate(-50%, -50%) scale(0.7);

  &:after,
  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    border: 2px solid;
  }
  &:before {
    bottom: -4px;
    left: -6px;
    width: 8px;
    height: 8px;
    border-radius: 10px;
  }
  &:after {
    top: -4px;
    left: 0;
    width: 10px;
    height: 6px;
    border-radius: 2px;
    transform: skewY(-15deg);
  }
`;