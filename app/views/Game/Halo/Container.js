import React from 'react';
import useBoard from '../../hooks/useBoard';
import container from './container.style';
import {
  normalize,
  isStartingOutOfBounds,
  isEndingOutOfBounds,
  isColliding,
} from '../../../managers/Vessels';

export default function Container({
  ships,
  type,
  drag,
  orientation,
  length,
  children,
}) {
  const {
    top,
    left,
    cellSize,
  } = useBoard();
  
  const coords = normalize(orientation, drag.segment, drag.coords);
  const isValid = drag.coords.length && 
    !isStartingOutOfBounds(coords) && 
    !isEndingOutOfBounds(orientation, length, coords) &&
    !isColliding(ships, type, length, orientation, coords);

  let [x, y] = coords;

  const offsetX = x * cellSize;
  const offsetY = y * cellSize;
  
  x = offsetX + left;
  y = offsetY + top;

  return (
    <div
      css={ container }
      style={ {
        visibility: isValid ? 'visible' : 'hidden',
        width: `${cellSize}px`,
        height: `${length * cellSize}px`,
        transform: `translate(${x}px, ${y}px)`,
      } }
    >
      { children }
    </div>
  );
};