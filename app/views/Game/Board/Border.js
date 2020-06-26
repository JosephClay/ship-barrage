import React from 'react';
import { horizontal, vertical } from './line.style';

export default function Border({ size }) {
  return (
    <>
      <div 
        css={ vertical }
        style={ {
          height: size,
          opacity: 0.3,
        } }
      />
      <div 
        css={ horizontal }
        style={ {
          width: size,
          opacity: 0.3,
        } }
      />
    </>
  );
};