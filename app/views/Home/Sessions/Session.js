import React from 'react';
import signal from 'signal-js';
import session from './session.style';
import Button from '../../components/Button';
import Chevron from '../../icons/Chevron';
import {
  STATE_SETUP,
  STATE_END,
  STATE_READY,
} from 'settings';

const getButtonText = ({
  turn,
  gameState,
  playerState,
  opponent,
  playerId,
}) => {
  const hasOpponent = !!opponent.length;
  const isMyTurn = turn === playerId;
  const isGameSettingUp = gameState === STATE_SETUP;
  const isGameDone = gameState === STATE_END;
  const amIReady = playerState === STATE_READY;

  if (isGameDone) return `Game over - see results`;
  if (isGameSettingUp && !amIReady) return `Place your pieces`;
  if (isGameSettingUp && amIReady && hasOpponent) return `${opponent} placing pieces`;
  if (isGameSettingUp && amIReady) return `Waiting for opponent`;
  if (isMyTurn && hasOpponent) return `Your turn against ${opponent}`;
  if (isMyTurn) return `Your turn`;
  if (!isMyTurn && hasOpponent) return `${opponent}'s turn`;
  return `Play`;
};

export default function Session(props) {
  const { id } = props;
  const message = getButtonText(props);
  return (
    <Button
      css={ session }
      block={ true }
      onClick={ () => signal.emit('join', id) }
    >
      <span>
        { id }: { message }
      </span>
      <Chevron />
    </Button>
  );
};