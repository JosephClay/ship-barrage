import React from 'react';
import useTile from './useTile';

export default function Tiles({
  size,
  cellSize,
  minimized,
}) {
  const tile = useTile(cellSize, minimized);

  return (
    <div
      style={ {
        position: 'absolute',
        width: size,      
        height: size,      
        backgroundRepeat: 'repeat',
        backgroundImage: `url(${tile})`
      } }
    />
  );
};