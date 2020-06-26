import { css } from '@emotion/core';

export default css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px 5px 15px;
  text-align: left;

  span {
    flex-shrink: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  i {
    flex-shrink: 0;
    transform: scale(0.6);
    transform-origin: right center;
  }

  + button {
    margin-top: 12px;
  }
`;