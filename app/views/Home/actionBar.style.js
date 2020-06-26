import { css } from '@emotion/core';

export default css`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-content: stretch;

  button + button {
    margin-left: 15px;
  }
`;