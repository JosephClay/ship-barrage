import { css } from '@emotion/core';
import { ACTION_AREA, FONT_DISPLAY } from 'theme';

export default css`
  position: absolute;
  z-index: ${ACTION_AREA};
  top: 50%;
  left: 0;
  right: 0;
  height: 135px;
  text-align: center;
  transform: translateY(-50%);
`;

export const title = css`
  font-size: ${FONT_DISPLAY};
`;

export const description = css`
  margin-bottom: 20px;
`;

export const nav = css`
  display: flex;
  justify-content: center;
`;

export const button = css`
  + button {
    margin-left: 15px;
  }
`;