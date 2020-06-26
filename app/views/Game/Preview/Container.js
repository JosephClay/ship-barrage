import React from 'react';
import piece, { rotation } from './piece.style';
import { VERTICAL } from 'settings';

export default function Container({
  coords,
  orientation,
  length,
  children,
}) {
  return (
    <div
      css={ piece }
      style={ {
        top: `${coords[1] * 10}%`,
        left: `${coords[0] * 10}%`,
        height: `${length * 10}%`,
      } }
    >
      <div
        css={ rotation }
        style={ {
          transform: orientation === VERTICAL ? '' : 'rotate(90deg) translateY(-100%)',
        } }
      >
        { children }
      </div>
    </div>
  );
};