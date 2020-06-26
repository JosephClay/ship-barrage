import { css } from '@emotion/core';

export default css`
  display: block;
  box-sizing: border-box;
  position: relative;
  width: 14px;
  height: 18px;
  margin-left: -2px;
  margin-top: -2px;
  border: 2px solid;

  &:after,
  &:before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
  }

  &:before {
    background:
        linear-gradient( to left,
            currentColor 5px, transparent 0)
            no-repeat right top/5px 2px,
        linear-gradient( to left,
            currentColor 5px, transparent 0)
            no-repeat left bottom/ 2px 5px;

    box-shadow: inset -4px -4px 0 -2px;
    bottom: -6px;
    right: -6px;
    width: 14px;
    height: 18px
  }

  &:after {
    width: 6px;
    height: 2px;
    left: 2px;
    top: 2px;
    box-shadow: 0 4px 0, 0 8px 0;
    background: currentColor;
  }
`;