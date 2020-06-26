import { css } from '@emotion/core';
import {
  HORIZONTAL,
  VERTICAL,
} from 'settings';

export default css`
  position: absolute;
  overflow: hidden;
  opacity: 0.2;

  &[data-type="${VERTICAL}"] {
    top: 0;
    bottom: 0;
    right: 100%;
    width: 5px;
    transform: translateX(-32px) scaleY(-1);
  }

  &[data-type="${HORIZONTAL}"] {
    left: 0;
    right: 0;
    bottom: 100%;
    height: 5px;
    transform: translateY(-32px) scaleX(-1);
  }
`;