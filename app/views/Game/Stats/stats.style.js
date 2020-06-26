import { css } from '@emotion/core';
import { FONT_TINY } from 'theme';

export default css`
  position: absolute;
  font-size: ${FONT_TINY};
`;

export const row = css`
  display: flex;
  margin-bottom: 5px;
`;

export const cell = css`
  width: 20%;
  flex-shrink: 0;

  &:nth-of-type(1) { flex-grow: 1; }
  &:nth-of-type(2) { flex-shrink: 0; text-align: right; }
  &:nth-of-type(3) { flex-shrink: 0; text-align: right; }
  &:nth-of-type(4) { flex-shrink: 0; text-align: right; }
`;

export const header = css`
  opacity: 0.5;
  text-align: left;
`;