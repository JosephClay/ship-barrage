import {
  MAX_BOARD_SIZE,
  CELL_COUNT,
  MIN_WIDTH,
} from 'settings';

const measure = ({
  width = global.innerWidth,
  height = global.innerHeight,
} = {}) => {
  const dimension = width < MIN_WIDTH ? (width * 0.8) : height;
  const size = Math.min(dimension, MAX_BOARD_SIZE);
  const left = Math.round((width - size) / 2);
  const top = Math.round((height - size) / 2);
  const cellSize = size / CELL_COUNT;

  return {
    size,
    top,
    left,
    cellSize,
  };
};

const Board = function(screen, board) {
  screen.on('update', () => {
    board.set(measure(screen.get()));
  });
};

Board.get = measure;

export default Board;