import { css } from '@emotion/core';

export default css`
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
    
  &:after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 4px;
    right: 6px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
  }
`;