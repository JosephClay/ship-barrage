import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { BACKGROUND, COLOR_MIDNIGHT } from 'theme';

export default css`
  position: absolute;
  z-index: ${BACKGROUND};
  top: 0;
  left: 0;
  background-color: ${rgba(COLOR_MIDNIGHT, 0.3)};
`;