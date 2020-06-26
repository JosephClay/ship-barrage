import { css } from '@emotion/core';
import { FONT_SMALL } from 'theme';

export default css`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;
  margin-bottom: 13px;
  opacity: 0.6;
  text-align: center;
  text-shadow: 1px 1px 0 #000;
  font-size: ${FONT_SMALL};
`;

export const cell = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 10%;

  &:after {
    content: attr(data-letter);
    margin-top: auto;
  }
`;