import range from 'utils/range';
import key from '../../battleship/key';
import { HORIZONTAL, VERTICAL } from 'settings';

const gatherShipCoords = ({ orientation, length, coords = [] }) => {
  return range(length).map(idx => {
    return [
      orientation === HORIZONTAL ? coords[0] + idx : coords[0],
      orientation === VERTICAL ? coords[1] + idx : coords[1],
    ];
  });
};

export default function Stats(mapSelector, shipsSelector, statsSelector) {
  const calculate = () => {
    const map = mapSelector.get();
    const ships = shipsSelector.get();
    
    if (!map || !ships) return;

    const stats = Object.entries(ships).map(([type, ship]) => {
      const hits = gatherShipCoords(ship)
        .filter(coords => map[key(coords)] !== undefined).length;
      const { length } = ship;
      const sunk = hits === length;
      return {
        type,
        hits,
        sunk,
        length,
      };
    });

    statsSelector.set(stats);
  };

  calculate();
  mapSelector.on('update', calculate);
};