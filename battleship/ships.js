import keyBy from 'utils/keyBy';
import {
  VERTICAL,
  HORIZONTAL,
} from 'settings';

export const ships = () => [
  {
    type: 'patrol',
    length: 2,
    orientation: VERTICAL,
    placed: false,
  },
  {
    type: 'submarine',
    length: 3,
    orientation: VERTICAL,
    placed: false,
  },
  {
    type: 'destroyer',
    length: 3,
    orientation: VERTICAL,
    placed: false,
  },
  {
    type: 'battleship',
    length: 4,
    orientation: HORIZONTAL,
    placed: false,
  },
  {
    type: 'carrier',
    length: 5,
    orientation: HORIZONTAL,
    placed: false,
  }
];

export const map = () => keyBy(ships(), 'type');