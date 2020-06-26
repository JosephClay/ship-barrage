import { css } from '@emotion/core';
import ship from './ship.style';

export default css`
  ${ship}
  path {
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
  }
    [data-color="1"] { fill: rgb(25.490196%, 25.490196%, 25.490196%); }
    [data-color="2"] { fill: rgb(42.745098%, 42.745098%, 42.745098%); }
    [data-color="3"] { fill: rgb(79.215686%, 79.215686%, 79.215686%); }
`;
