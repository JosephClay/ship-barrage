import React from 'react';
import container from './container.style';

export default function Container({
  size,
  x,
  y,
  children,
}) {  
  return (
    <>
      <div
        css={ container }
        style={ {
          width: size,
          height: size,
          transform: `translate(${x}px, ${y}px)`,
        } }
      >
        { children }
      </div>
    </>
  );
};