import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import {
  FONT_LIGHT,
  FONT_FAMILY,
  FONT_NORMAL,
  COLOR_WHITE,
  COLOR_AQUAMARINE,
  COLOR_MIDNIGHT,
} from 'theme';

export default (type, block) => css`
  outline: none;

  width: ${block ? '100%' : 'auto'};
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid ${type === 'primary' ? COLOR_AQUAMARINE : rgba(COLOR_WHITE, 0.6)};
  
  color: ${COLOR_WHITE};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.35);
  font-size: ${FONT_NORMAL};
  font-weight: ${FONT_LIGHT};
  font-family: ${FONT_FAMILY};

  background: ${rgba(COLOR_MIDNIGHT, 0.1)};
  transition: background-color 250ms ease;
  cursor: pointer;

  &:hover {
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
    background: ${rgba(COLOR_MIDNIGHT, 0.5)};
  }

  &[disabled] {
    opacity: 0.5;
    border-color: ${rgba(COLOR_WHITE, 0.6)};
    cursor: default;
    pointer-events: none;
  }
`;