import { css } from '@emotion/core';
import {
  DURATION_IN,
  EASE_IN,

  DURATION_OUT,
  EASE_OUT,
} from 'theme';

export default css`
  opacity: 0;
  // out
  transition: opacity ${DURATION_OUT}ms ${EASE_OUT};
  will-change: opacity;

  // in
  &[data-active="true"] {
    opacity: 1;
    transition: opacity ${DURATION_IN}ms ${EASE_IN};
  }
`;