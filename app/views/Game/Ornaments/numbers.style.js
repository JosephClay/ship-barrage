import { css } from '@emotion/core';
import { FONT_SMALL } from 'theme';

export default css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  margin-right: 13px;
  opacity: 0.6;
  text-align: right;
  text-shadow: 1px 1px 0 #000;
  font-size: ${FONT_SMALL};
`;

export const cell = css`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 10%;

  &:after {
    content: attr(data-number);
    margin: auto 0;
  }
`;