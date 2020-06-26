import { css } from '@emotion/core';
import { COLOR_WHITE } from 'theme';

const line = css`
  position: absolute;
  background-color: ${COLOR_WHITE};
`;

export const horizontal = [
  line,
  css`
    height: 1px;
  `,
];

export const vertical = [
  line,
  css`
    width: 1px;
  `,
];

export default line;