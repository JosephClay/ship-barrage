import { css } from '@emotion/core';
import ship from './ship.style';

export default css`
  ${ship}
  path {
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
  }
    [data-color="1"] { fill: rgb(24.313725%, 24.313725%, 24.313725%); }
    [data-color="2"] { fill: rgb(67.45098%, 54.901961%, 39.607843%); }
    [data-color="3"] { fill: rgb(48.235294%, 48.235294%, 48.235294%); }
    [data-color="4"] { fill: rgb(82.352941%, 82.352941%, 82.352941%); }
`;
