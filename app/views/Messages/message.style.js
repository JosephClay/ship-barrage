import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import {
  FONT_TINY,
  COLOR_WHITE,
} from 'theme';

export default css`
  position: relative;
  margin-top: 5px;
  padding: 5px 10px 5px 20px;
  font-size: ${FONT_TINY};
  flex-shrink: 0;
  overflow: hidden;

  > span {
    display: inline-block;
    position: absolute;
    width: 20px;
    top: 0;
    bottom: 0;
    left: 0;

    &:hover {
      background: ${rgba(COLOR_WHITE, 0.2)};
    }
  }
    i {
      transform: translate(-50%, -50%) scale(0.6);
    }
`;