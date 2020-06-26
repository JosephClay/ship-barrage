import isNumber from 'utils/isNumber';
import signal from 'signal-js';

const Pointer = function(pointer, screen, board) {
  const emitter = signal();

  const move = function({ pageX, pageY, coords }) {
    if (pageX === undefined || pageY === undefined) return coords;

    const { size, top, left } = board.get();

    const offsetX = pageX - left;
    const offsetY = pageY - top;

    const cellSize = size / 10;
    const x = Math.floor(offsetX / cellSize) || 0;
    const y = Math.floor(offsetY / cellSize) || 0;
    
    if (x < 0 || y < 0) return [];
    if (x > 9 || y > 9) return [];

    return [x, y];
  };

  const calc = e => {
    // determine where the pointer is in relationship
    // to the midpoints of the document as a percentage
    // of the total document size
    
    const { width, height } = screen.get();
    const midWidth = width / 2;
    const midHeight = height / 2;
    const x = isNumber(e.x) ? e.x : e.clientX;
    const y = isNumber(e.y) ? e.y : e.clientY;
    const percX = ((midWidth - x) / midWidth) * -1;
    const percY = ((midHeight - y) / midHeight) * -1;
    
    const coords = move(e);
    const prevCoords = pointer.get('coords');
    if (
      coords && coords.length &&
      (prevCoords[0] !== coords[0] || prevCoords[1] !== coords[1])) {
      emitter.emit('coords:change', coords);
    }

    pointer.merge({
      x,
      y,
      percX,
      percY,
      coords,
    });
  };

  screen.on('update', () => calc(pointer.get()));
  document.addEventListener('pointermove', calc);

  return Object.assign(emitter, {
    move: calc,
  });
};

Pointer.get = () => ({
  x: 0,
  y: 0,
  percX: 0,
  percY: 0,
  coords: [],
});

export default Pointer;