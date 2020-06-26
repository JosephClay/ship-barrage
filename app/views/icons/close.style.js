import { css } from '@emotion/core';

export default css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 5px;
    left: 0;
    width: 12px;
    height: 2px;
    border-radius: 5px;
    background: currentColor;
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;