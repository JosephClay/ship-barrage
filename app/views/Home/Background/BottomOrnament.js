import React from 'react';
import bottomOrnament from './bottomOrnament.style';
import useParallax from '../../hooks/useParallax';

const MAX_DISTANCE = 0.5; // perc

export default function BottomOrnament() {
  const { x } = useParallax(MAX_DISTANCE);

  return (
    <div
      css={ bottomOrnament }
      style={ {
        transform: `translateX(${x}%)`,
      } }
    />
  );
};