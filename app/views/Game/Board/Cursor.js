import React from 'react';
import cursor from './cursor.style';
import usePointer from '../../hooks/usePointer';
import useDrag from '../../hooks/useDrag';

export default function Cursor({ cellSize, getPosition }) {
  const { type } = useDrag();
  const { coords } = usePointer();
  
  const isVisible = !type && coords.length;
  const [x, y] = coords;

  return (
    <div
      css={ cursor }
      style={ {
        visibility: isVisible ? 'visible' : 'hidden',
        width: cellSize,
        height: cellSize,
        transform: `translate(${getPosition(x)}px, ${getPosition(y)}px)`,
      } }
    />
  );
}