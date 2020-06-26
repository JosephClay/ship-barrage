import React from 'react';
import info from './info.style';
import ReadyButton from './ReadyButton';
import useTypewriter from '../../hooks/useTypewriter';
import useGameState from '../../hooks/useGameState';
import useGame from '../../hooks/useGame';
import useStore from '../../hooks/useStore';

const isPlaced = ({ placed }) => placed;

export default function Info() {
  const {
    isSetup,
    isPlayerReady,
  } = useGameState();
  const {
    opponentName: opponent,
    turn: turnId,
    ships = [],
  } = useGame();
  const playerId = useStore(['playerId']);

  const isMyTurn = playerId === turnId;
  const isEveryShipPlaced = Object.values(ships).every(isPlaced);
  const message = !isEveryShipPlaced ? `Place your ships` :
    isSetup && !isPlayerReady ? `` :
      isSetup && isPlayerReady ? `Waiting for ${opponent || 'Opponent'}` :
        isMyTurn ? `Your turn` : 
          `${opponent || 'Opponent'}'s Turn`;
  const content = useTypewriter(message);

  return (
    <div css={ info }>
      { isEveryShipPlaced && isSetup && !isPlayerReady && <ReadyButton /> }
      { isEveryShipPlaced && isSetup && !isPlayerReady ? '' : content }
    </div>
  );
};