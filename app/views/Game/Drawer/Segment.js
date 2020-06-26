import React from 'react';
import signal from 'signal-js';
import style from './segment.style';
import { HORIZONTAL } from 'settings';

export default function Segment({
  index,
  type,
  orientation,
  length,
}) {
  const value = orientation === HORIZONTAL ? length - index - 1 : index;
  const segment = 100 / length;
  return (
    <div
      css={ style }
      onClick={ () => signal.emit('ship:rotate', type) }
      onPointerDown={ e => signal.emit('drop:start', {
        e,
        type,
        cell: value,
      }) }
      style={ {
        top: `${index * segment}%`,
        height: `${segment}%`,
      } }
    />
  );
};