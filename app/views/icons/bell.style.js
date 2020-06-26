import { css } from '@emotion/core';

export default css`
  &,
  &:before {
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
  }

  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid;
  border-bottom: 0;
  width: 14px;
  height: 14px;
  transform: translate(-50%, -50%) scale(0.7);
  
  &:after,
  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
  }
  &:before {
    top: -4px;
    left: 3px;
    width: 4px;
    height: 4px;
    background: currentColor;
  }
  &:after {
    top: 14px;
    left: -3px;
    width: 16px;
    height: 10px;
    border-radius: 3px;
    border: 6px solid transparent;
    border-top: 1px solid transparent;
    box-shadow:
        inset 0 0 0 4px,
        0 -2px 0 0;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
  }
`;