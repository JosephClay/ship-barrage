import key from './key';
import {  
  VERTICAL,
  HORIZONTAL,
} from 'settings';

export default function boardCollisionCheck(board, length, orientation, [X, Y]) {
  for (let idx = 0; idx < length; idx++) {
    const x = orientation === HORIZONTAL ? X + idx : X;
    const y = orientation === VERTICAL ? Y + idx : Y;
    if (board[key(x, y)] === 1) {
      return true;
    }
  }
  return false;
};