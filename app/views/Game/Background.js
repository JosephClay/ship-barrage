import React from 'react';
import Map from './Map';
import Board from './Board';
import Snow from './Snow';
import Fireworks from './Fireworks';
import background from './background.style';
import useGame from '../hooks/useGame';

export default function Background({
  isGame,
  isWinner,
  isActive,
  isEnd,
}) {
  const {
    map,
    screen,
  } = useGame();

  return (
    <div css={ background }>
      <Map />
      { isActive && <Board attacks={ map } minimized /> }
      { !isEnd && (
        <Board
          attacks={ isActive && screen }
          waves={ isGame && isActive }
          cursor={ isActive }
          offset={ isActive }
        />
      ) }
      { isEnd && !isWinner && <Snow /> }
      { isEnd && isWinner && <Fireworks /> }
    </div>
  );
};