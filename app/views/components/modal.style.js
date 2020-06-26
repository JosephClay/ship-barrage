import { css } from '@emotion/core';
import rgba from 'utils/rgba';
import { MODAL, COLOR_BLACK } from 'theme';

export default css`
  position: absolute;
  z-index: ${MODAL};
  top: 50%;
  left: 50%;
  width: 80vw;
  max-width: 495px;
  padding: 40px 50px;
  border-radius: 5px;
  box-shadow: 0 25px 50px ${rgba(COLOR_BLACK, 0.3)};
  background: #011b34;
  transform: translate(-50%, -50%);
`;

export const close = css`
  position: absolute;
  z-index: ${MODAL};
  top: 10px;
  right: 10px;
`;

export const mask = css`
  position: absolute;
  z-index: ${MODAL - 1};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;  
  background: ${rgba(COLOR_BLACK, 0.1)};
`;