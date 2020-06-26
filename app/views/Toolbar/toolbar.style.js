import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { TOOLBAR, COLOR_WHITE, COLOR_BLACK } from 'theme';

export default css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: absolute;
  z-index: ${TOOLBAR};
  bottom: 20px;
  right: 20px;
  width: 36px;
`;

// spacing & tooltips
export const button = css`
  & + & {
    margin-top: 10px;
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    color: ${COLOR_WHITE};
    opacity: 0;
    white-space: nowrap;
    transition-delay: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  &:before {
    content: attr(data-tooltip);
    top: 50%;
    right: 100%;
    padding: 10px 25px;
    border-radius: 5px;
    background: ${rgba(COLOR_BLACK, 0.3)};
    transform: translate(-10px, -50%);
  }

  &:after {
    top: 50%;
    right: 100%;

    width: 0;
    height: 0;
    border-style: solid;
    border-width: 3px 0 3px 5px;
    border-color: transparent transparent transparent ${rgba(COLOR_BLACK, 0.3)};
    
    transform: translate(-5px, -50%);
  }

  &:hover {
    &:before,
    &:after {
      opacity: 1;
      transition-delay: 500ms;
    }
  }

  &[data-active="false"] {
    opacity: 0.5;
  }
`;