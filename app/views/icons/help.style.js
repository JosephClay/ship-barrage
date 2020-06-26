import { css } from '@emotion/core';
import { FONT_BOLD } from 'theme';

export default css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  transform: translate(-50%, -50%);

  &:before {
    content: '?';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: ${FONT_BOLD};
    font-style: normal;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);
  }
`;