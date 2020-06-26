import React from 'react';
import signal from 'signal-js';
import Button from '../components/Button';
import Opponent from '../components/Opponent';
import summary, { title, nav, description, button } from './summary.style';
import useGame from '../hooks/useGame';

const onPlayAgain = () => signal.emit('replay');

const onLeave = () => signal.emit('leave');

export default function Summary({ isWinner }) {
  const {
    screen,
    map,
  } = useGame();

  return (
    <div css={ summary }>
      <p css={ title }>
        { isWinner ? `You Won!` : 'You Lost' }
      </p>
      { isWinner && (
        <p css={ description }>
          You beat <Opponent /> in <strong>{ Object.keys(map).length }</strong> moves
        </p>
      ) }
      { !isWinner && (
        <p css={ description }>
          <Opponent /> beat you in <strong>{ Object.keys(screen).length }</strong> moves
        </p>
      ) }
      <nav css={ nav }>
        <Button
          css={ button }
          variant="primary"
          onClick={ onPlayAgain }
        >
          PLAY AGAIN
        </Button>
        <Button
          css={ button }
          variant="primary"
          onClick={ onLeave }
        >
          LEAVE GAME
        </Button>
      </nav>
    </div>
  );
};