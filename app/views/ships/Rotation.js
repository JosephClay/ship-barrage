import React from 'react';
import rotation from './rotation.style';
import { VERTICAL } from 'settings';

export default function Rotation({ orientation, children }) {
  return (
    <div
      css={ rotation }
      style={ { transform: orientation === VERTICAL ? '' : 'rotate(90deg) translateY(-100%)' } }
    >
      { children }
    </div>
  );
};