import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { COLOR_WHITE } from 'theme';
import {
  HORIZONTAL,
  VERTICAL,
} from 'settings';

export default css`
  position: absolute;
  background: ${rgba(COLOR_WHITE, 0.1)};

  &[data-type="${HORIZONTAL}"] {
    height: 1px;
    left: 0;
    right: 0;
    bottom: 100%;
    margin-bottom: 5px;
  }
  &[data-type="${VERTICAL}"] {
    width: 1px;
    top: 0;
    bottom: 0;
    right: 100%;
    margin-right: 5px;
  }
`;