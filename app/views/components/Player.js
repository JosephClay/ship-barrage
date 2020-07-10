import React from 'react';
import player from './player.style';
import { useStore } from '@immutabl3/store/react';

export default function Player() {
  const name = useStore(['playerName']);
  return (
    <span css={ player }>
      { name }
    </span>
  );
};