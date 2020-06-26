import { css } from '@emotion/core';

export default css`
  max-width: 170px;
  margin: 0 auto;
  text-align: center;
`;

export const nav = css`
  display: flex;
  justify-content: space-between;
`;

export const button = css`
  &:nth-of-type(1) {
    flex-shrink: 0;
  }

  + button {
    margin-left: 7px;
  }
`;