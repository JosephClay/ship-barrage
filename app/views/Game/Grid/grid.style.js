import { css } from '@emotion/core';

export default css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;