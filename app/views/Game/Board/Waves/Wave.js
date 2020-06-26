import React, { useEffect } from 'react';
import wave, { ripple } from './wave.style';

export default function Wave({
  size,
  onDone,
  getPosition,
  coords: [x, y],
}) {
  useEffect(() => {
    const timeout = setTimeout(onDone, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      css={ wave }
      style={ {
        width: size,
        height: size,
        transform: `translate(${getPosition(x)}px, ${getPosition(y)}px)`,
      } }
    >
      <div css={ ripple } />
      <div css={ ripple } />
      <div css={ ripple } />
    </div>
  );
};