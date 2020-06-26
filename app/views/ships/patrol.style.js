import { css } from '@emotion/core';
import ship from './ship.style';

export default css`
  ${ship}
  path {
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
  }
    [data-color="1"] { fill: rgb(20.784314%, 20.784314%, 20.784314%); }
    [data-color="2"] { fill: rgb(33.72549%, 33.72549%, 33.72549%); }
    [data-color="3"] { fill: rgb(46.666667%, 46.666667%, 46.666667%); }
    [data-color="4"] { fill: rgb(83.137255%, 83.137255%, 83.137255%); }
`;
