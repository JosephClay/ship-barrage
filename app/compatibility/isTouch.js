// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
const { DocumentTouch, matchMedia } = global;
export default 'ontouchstart' in global || DocumentTouch && document instanceof DocumentTouch ? true :
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join: https://git.io/vznFH
  matchMedia(`(${['-webkit-', '-moz-', '-o-', '-ms-'].join('touch-enabled),(')}heartz)`).matches;