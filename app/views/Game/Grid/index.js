import React from 'react';
import signal from 'signal-js';
import grid from './grid.style';

const onAttack = () => signal.emit('player:attack');
const onPointerMove = e => signal.emit('pointer:move', e);
const onPointerLeave = () => signal.emit('drop:leave');

export default function Grid({
  className,
  children,
  attack,
}) {  
  return (
    <div
      css={ grid }
      className={ className }
      onClick={ attack ? onAttack : undefined }
      onPointerMove={ onPointerMove }
      onPointerLeave={ onPointerLeave }
    >
      { children }
    </div>
  );
};