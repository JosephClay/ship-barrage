import { css } from '@emotion/core';
import ship from './ship.style';

export default css`
  ${ship}
  path {
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
  }
    [data-color="0"] { fill: rgb(30.980392%, 30.980392%, 30.980392%); }
    [data-color="1"] { fill: rgb(41.568627%, 41.568627%, 41.568627%); }
    [data-color="3"] { fill: rgb(61.176471%, 61.176471%, 61.176471%); }
    [data-color="4"] { fill: rgb(94.509804%, 90.196078%, 0%); }
    [data-color="5"] { fill: rgb(88.235294%, 88.235294%, 88.235294%); }
`;
