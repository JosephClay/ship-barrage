import React from 'react';
import Attack from './Attack';
import coords from '../../../../../battleship/coords';

export default function Attacks({
  attacks = {},
  cellSize,
  getPosition,
}) {
  return Object
    .entries(attacks)
    .filter(([, attack]) => attack !== 0)
    .map(([key, attack]) => {
      const [x, y] = coords(key);
      return (
        <Attack
          key={ key }
          attack={ attack }
          x={ getPosition(x) }
          y={ getPosition(y) }
          width={ cellSize }
          height={ cellSize }
        />
      );
    });
};