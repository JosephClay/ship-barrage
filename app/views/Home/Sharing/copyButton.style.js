import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { COLOR_WHITE, COLOR_BLACK } from 'theme';

export default css`
  &:before {
    content: 'Copied!';
    position: absolute;
    left: 50%;
    bottom: 100%;
    margin-bottom: 5px;
    padding: 10px 25px;
    border-radius: 5px;
    color: ${COLOR_WHITE};
    opacity: 0;
    white-space: nowrap;
    background: ${rgba(COLOR_BLACK, 0.3)};
    transform: translateX(-50%);
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  &[data-copied="true"] {
    &:before {
      opacity: 1;
    }
  }
`;

export const icon = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.7);
`;