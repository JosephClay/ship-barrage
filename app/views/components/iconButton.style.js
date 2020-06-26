import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import {
  FONT_LIGHT,
  FONT_NORMAL,
  FONT_FAMILY,
  COLOR_WHITE,
  COLOR_MIDNIGHT,
} from 'theme';

export default css`
  position: relative;
  width: 36px;
  height: 36px;
  outline: none;
  border: 1px solid ${COLOR_WHITE};
  border-radius: 5px;
  color: ${COLOR_WHITE};
  font-size: ${FONT_NORMAL};
  font-weight: ${FONT_LIGHT};
  font-family: ${FONT_FAMILY};
  background-color: transparent;
  transition: background-color 250ms ease;
  cursor: pointer;

  &:hover {
    background-color: ${rgba(COLOR_MIDNIGHT, 0.5)};
  }
`;