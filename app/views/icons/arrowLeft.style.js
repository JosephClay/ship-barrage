import { css } from '@emotion/core';

export default css`
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 22px;
  height: 22px;

  &:after,
  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
  }
  &:after {
    width: 8px;
    height: 8px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    transform: rotate(45deg);
    bottom: 7px;
  }
  &:before {
    width: 16px;
    height: 2px;
    bottom: 10px;
    background: currentColor;
  }
`;