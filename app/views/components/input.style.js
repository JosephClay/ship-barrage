import { css } from '@emotion/core';
import {
  FONT_LIGHT,
  FONT_FAMILY,
  FONT_MEDIUM,
  COLOR_WHITE,
  COLOR_MIDNIGHT,
  COLOR_AQUAMARINE,
} from 'theme';

export default css`
  display: block;
  width: 100%;
  padding: 10px 0;
  margin: 0 0 15px 0;
  outline: 0;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid ${COLOR_WHITE};
  color: ${COLOR_WHITE};
  font-size: ${FONT_MEDIUM};
  font-weight: ${FONT_LIGHT};
  font-family: ${FONT_FAMILY};
  background: none;

  &:active, &:focus {
    border-bottom-color: ${COLOR_AQUAMARINE};
  }

  &::selection {
    color: ${COLOR_WHITE};
    background: ${COLOR_MIDNIGHT};
  }
`;