import React from 'react';
import useBoardPlacement from '../../hooks/useBoardPlacement';
import styles, { row, header, cell } from './stats.style';
import useStore from '../../hooks/useStore';

const humanNames = new Map([
  ['battleship', 'Battleship'],
  ['carrier', 'Carrier'],
  ['destroyer', 'Destroyer'],
  ['patrol', 'Patrol'],
  ['submarine', 'Submarine'],
]);

export default function Stats() {
  const { size, x, y } = useBoardPlacement({ stats: true });
  const stats = useStore(['stats']) || [];

  return (
    <div
      css={ styles }
      style={ {
        width: size,
        height: size,
        top: y,
        left: x,
      } }
    >
      <div css={ [row, header] }>
        <span css={ cell }>ship</span>
        <span css={ cell }>size</span>
        <span css={ cell }>hits</span>
        <span css={ cell }>sunk</span>
      </div>
      {
        stats.map(({ type, hits, length, sunk }) => {
          return (
            <div key={ type } css={ row }>
              <span css={ cell }>{ humanNames.get(type) }</span>
              <span css={ cell }>{ length }</span>
              <span css={ cell }>{ hits }</span>
              <span css={ cell }>{ sunk ? 'yes' : 'no'}</span>
            </div> 
          );  
        })
      }
    </div>
  );
};