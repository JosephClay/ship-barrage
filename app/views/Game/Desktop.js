import React from 'react';
import desktop from './desktop.style';
import useBoardPlacement from '../hooks/useBoardPlacement';

export default function Desktop({ hideCursor, children }) {
  const { size, x, y } = useBoardPlacement();
   
  return (
    <div
      css={ desktop }
      style={ {
        width: size,
        height: size,
        top: y,
        left: x,
        cursor: hideCursor ? 'none' : undefined,
      } }
    >
      { children }
    </div>
  );
};