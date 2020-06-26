import React from 'react';
import Pieces from './Pieces';
import preview from './preview.style';
import useBoardPlacement from '../../hooks/useBoardPlacement';

export default function Preview() {
  const { size, x, y } = useBoardPlacement({ minimized: true });

  return (
    <div
      css={ preview }
      style={ {
        width: size,
        height: size,
        top: y,
        left: x,
      } }
    >
      <Pieces />
    </div>
  );
};