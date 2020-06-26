import React from 'react';
import usePointer from '../../hooks/usePointer';
import cursor, { alignment, circle, reticules, reticule } from './targetingCursor.style';

export default function TargetingCursor() {
  const {
    x,
    y,
    coords,
  } = usePointer();

  return (
    <div
      css={ cursor }
      style={ {
        visibility: coords.length ? 'visible' : 'hidden',
        transform: `translate(${x}px, ${y}px)`,
      } }
    >
      <div css={ alignment }>
        <div css={ circle } />
        <div css={ reticules }>
          <div css={ reticule } />
          <div css={ reticule } />
          <div css={ reticule } />
          <div css={ reticule } />
        </div>
      </div>
    </div>
  );
};