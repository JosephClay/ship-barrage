import React from 'react';
import container from './container.style';
import useSnap from './useSnap';
import positions from './positions';

export default function Container({
  drag,
  placed,
  coords,
  length,
  type,
  children,
  disabled,
}) {
  const drawer = positions.get(type);
  const isDragging = drag.type === type;
  const { isSnapping, x: posX, y: posY } = useSnap(isDragging, drag, placed);
  const top = placed ? coords : drawer;
  const left = placed ? coords : drawer;
    
  return (
    <div
      css={ container }
      style={ {
        top: `${top[1] * 10}%`,
        left: `${left[0] * 10}%`,
        height: `${length * 10}%`,
        pointerEvents: disabled || isDragging || isSnapping ? 'none' : 'auto',
        transform: isDragging ? `translate(${drag.x}px, ${drag.y}px)` : 
          isSnapping ? `translate(${posX}px, ${posY}px)` : 
            undefined,
      } }
    >
      { children }
    </div>
  );
};