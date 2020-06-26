import { css } from '@emotion/core';
import {
  ACTION_AREA,

  DURATION_IN,
  EASE_IN,

  DURATION_OUT,
  EASE_OUT,
} from 'theme';

export default css`
  position: absolute;
  z-index: ${ACTION_AREA};
  top: 50%;
  left: 50%;
  width: 275px;
  opacity: 0;
  // out
  transform: translate(-50%, -100%);
  transition:
      transform ${DURATION_IN}ms ${EASE_OUT},
      opacity ${DURATION_IN}ms ${EASE_OUT};

  // position bottom
  &[data-position="bottom"] {
    transform: translate(-50%, 100%);
  }

  // not active - dont allow interaction
  &[data-active="false"] {
    pointer-events: none;
  }

  // in
  &[data-active="true"] {
    opacity: 1;
    transform: translate(-50%, -50%);
    transition:
      transform ${DURATION_OUT}ms ${EASE_IN},
      opacity ${DURATION_OUT}ms ${EASE_IN};
  }
`;