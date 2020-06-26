import React from 'react';
import Ship from './Ship';
import useDrag from '../../hooks/useDrag';
import useGame from '../../hooks/useGame';

export default function Halo() {
  const drag = useDrag();
  const { ships } = useGame();

  if (!drag.type) return null;

  return (
    <Ship
      ships={ ships }
      drag={ drag }
    />
  );
};