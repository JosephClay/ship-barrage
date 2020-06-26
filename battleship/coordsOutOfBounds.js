import {
  MIN_COORD,
  MAX_COORD,
} from 'settings';

export default ([x, y]) => (
  x < MIN_COORD || x > MAX_COORD ||
  y < MIN_COORD || y > MAX_COORD
);