import React from 'react';
import Piece from './Piece';
import useDrag from '../../hooks/useDrag';
import useGame from '../../hooks/useGame';

export default function Drawer({ disabled }) {
  const drag = useDrag();
  const {
    ships: {
      patrol,
      submarine,
      destroyer,
      battleship,
      carrier,
    },
  } = useGame();
  
  return (
    <>
      <Piece
        { ...patrol }
        drag={ drag }
        disabled={ disabled }
      />
      <Piece
        { ...submarine }
        drag={ drag }
        disabled={ disabled }
      />
      <Piece
        { ...destroyer }
        drag={ drag }
        disabled={ disabled }
      />
      <Piece
        { ...battleship }
        drag={ drag }
        disabled={ disabled }
      />
      <Piece
        { ...carrier }
        drag={ drag }
        disabled={ disabled }
      />
    </>
  );
};