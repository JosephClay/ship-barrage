import distance from 'utils/distance';
import collisionDetection from './collisionDetection';
import coordsOutOfBounds from '../../../battleship/coordsOutOfBounds';
import {
  HORIZONTAL,
  VERTICAL,
  SOUND_PLACE,
} from 'settings';

const normalize = (orientation, segment, coords) => {
  return [
    orientation === HORIZONTAL ? coords[0] - segment : coords[0],
    orientation === VERTICAL ? coords[1] - segment : coords[1],
  ];
};

const isEndingOutOfBounds = (orientation, length, coords) => {
  return coordsOutOfBounds([
    orientation === HORIZONTAL ? coords[0] + length - 1 : coords[0],
    orientation === VERTICAL ? coords[1] + length - 1 : coords[1],
  ]);
};

const isColliding = (ships, type, length, orientation, coords) => {
  return !!Object.keys(ships)
    .filter(key => key !== type)
    .map(key => ships[key])
    .filter(entry => entry.placed)
    .find(({ length: len, orientation: ort, coords: [x, y] }) => {
      return collisionDetection({
        x,
        y,
        width: ort === HORIZONTAL ? len : 1,
        height: ort === VERTICAL ? len : 1,
      }, {
        x: coords[0],
        y: coords[1],
        width: orientation === HORIZONTAL ? length : 1,
        height: orientation === VERTICAL ? length : 1,
      });
    });
};

const Vessels = function({
  pointer,
  drag,
  ships,
  audio,
  socket,
}) {
  let startingCoords;
  let activeType;

  const onMove = e => {
    const [clientX, clientY] = startingCoords;
    const { clientX: moveX, clientY: moveY } = e.touches ? e.touches[0] : e;

    const x = moveX - clientX;
    const y = moveY - clientY;
    
    const dist = distance(moveX, moveY, clientX, clientY);
    const currentType = drag.get('type');

    drag.merge({
      x,
      y,
      // assign the type if we've gone far enough - this will trigger
      // the dragging
      type: currentType ? currentType : dist > 3 ? activeType : undefined,
    });
  };

  const snap = () => {
    drag.merge({
      x: 0,
      y: 0,
      type: '',
      coords: [],
    });
  };
  
  const unplace = type => {
    snap();

    ships.merge([type], {
      placed: false,
      coords: [0, 0],
    });

    socket.send('piece:unplace', { type });
  };
  
  const onEnd = () => {
    // remove listeners
    global.removeEventListener('pointermove', onMove);
    global.removeEventListener('pointerleave', onEnd);
    global.removeEventListener('pointerup', onEnd);

    // save local definitions
    let coords = [...drag.get('coords')];
    const type = drag.get('type');
    const cellIndex = drag.get('segment');

    // clear out tracked variabels
    drag.set('segment', 0);
    drag.set('type', '');
    startingCoords = undefined;
    activeType = undefined;

    if (!type) return;
    if (!coords.length || cellIndex === undefined) return unplace(type);

    // normalize the position to the top-left
    const orientation = ships.get([type, 'orientation']);
    coords = normalize(orientation, cellIndex, coords);

    // check if starting position is out-of-bounds
    if (coordsOutOfBounds(coords)) return unplace(type);

    // check if ending position is out-of-bounds
    const length = ships.get([type, 'length']);
    if (isEndingOutOfBounds(orientation, length, coords)) return unplace(type);

    // check if it collides with other pieces
    if (isColliding(ships.get(), type, length, orientation, coords)) return unplace(type);

    // line it up on the board (eager)
    snap();
    ships.merge([type], {
      placed: true,
      coords,
    });

    audio.play(SOUND_PLACE);
    socket.send('piece:place', {
      type,
      coords,
      orientation,
    }, ({ success }) => {
      if (success) return;
      
      // revert
      ships.merge([type], {
        placed: false,
        coords: [0, 0],
      });
    });
  };

  return {
    rotate(type) {
      ships.merge([type], {
        orientation: ships.get([type, 'orientation']) === VERTICAL ? HORIZONTAL : VERTICAL,
      });

      if (!ships.get([type, 'placed'])) return;

      socket.send('piece:place', {
        type,
        coords: ships.get([type, 'coords']),
        orientation: ships.get([type, 'orientation']),
      }, ({ success }) => {
        if (success) return;
        
        // revert
        ships.merge([type], {
          placed: false,
          coords: [0, 0],
        });
      });
    },
    move() {
      drag.set('coords', pointer.get('coords'));
    },
    leave() {
      drag.set('coords', []);
    },
    dropStart({ cell, e, type }) {
      const { clientX, clientY } = e.touches ? e.touches[0] : e;
      
      startingCoords = [clientX, clientY];
      activeType = type;
      // dont assign type yet - we're not dragging until
      // drag.set('type', type);
      drag.set('coords', []);
      drag.set('segment', cell);

      global.addEventListener('pointermove', onMove);
      global.addEventListener('pointerleave', onEnd);
      global.addEventListener('pointerup', onEnd);
    },
  };
};


Vessels.get = () => ({
  x: 0,
  y: 0,
  segment: 0,
  type: '',
  coords: [],
});

export default Vessels;

export {
  normalize,
  isColliding,
  isEndingOutOfBounds,
  coordsOutOfBounds as isStartingOutOfBounds,
};