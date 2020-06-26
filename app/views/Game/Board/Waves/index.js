import React from 'react';
import Wave from './Wave';
import style from './waves.style';
import useWaves from './useWaves';

export default function Waves({
  attacks,
  cellSize,
  getPosition,
}) {
  const waves = useWaves(attacks);
  
  return (
    <div css={ style }>
      { waves.map(wave => (
        <Wave
          {...wave}
          size={ cellSize }
          getPosition={ getPosition }
        />
      )) }
    </div>
  );
};