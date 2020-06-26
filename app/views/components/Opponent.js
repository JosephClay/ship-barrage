import React from 'react';
import opponent from './opponent.style';
import isString from 'utils/isString';
import useGame from '../hooks/useGame';

export default function Opponent() {
  const { opponentName: name } = useGame();
  return (
    <span css={ opponent }>
      { isString(name) && name.length ? name : 'opponent' }
    </span>
  );
};