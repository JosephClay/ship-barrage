import { css } from '@emotion/core';
import { COLOR_WHITE } from 'theme';

export default css`
  position: absolute;
  left: 50%;
  bottom: 25px;
  width: 80vh;
  height: 13px;
  margin-left: -40vh;
  opacity: 0.4;
  border: 1px solid ${COLOR_WHITE};
  border-top: 0;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: ${100 / 6}%;
    height: 100%;
    border-left: 1px solid ${COLOR_WHITE};
    border-right: 1px solid ${COLOR_WHITE};
  }

  &:before {
    left: ${100 / 6}%;
  }

  &:after {
    right: ${100 / 6}%;
  }
`;