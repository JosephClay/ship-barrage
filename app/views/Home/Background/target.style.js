import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { COLOR_WHITE } from 'theme';

export default css`
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 25px;
  width: 80vh;
  height: 80vh;
  border-radius: 50%;
  border: 1px solid ${rgba(COLOR_WHITE, 0.3)};
  transform: translate(-50%, -50%);
`;

export const two = css`
  width: 60vh;
  height: 60vh;
  border: 1px solid ${rgba(COLOR_WHITE, 0.1)};
  box-shadow: 0 0 18vh ${rgba(COLOR_WHITE, 0.1)};
  background: ${rgba(COLOR_WHITE, 0.05)};
`;

export const three = css`
  width: 40vh;
  height: 40vh;
  border: 1px solid ${rgba(COLOR_WHITE, 0.2)};
`;