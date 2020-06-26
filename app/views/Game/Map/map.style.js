import { css } from '@emotion/core';

export default css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 5s ease-out;

  &[data-loaded="true"] { opacity: 0.05; }
`;