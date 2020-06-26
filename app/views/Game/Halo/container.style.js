import { css } from '@emotion/core';
import { HALO } from 'theme';

export default css`
  position: absolute;
  z-index: ${HALO};
  top: 0;
  left: 0;
	opacity: 0.3;
	pointer-events: none;
`;