import React from 'react';
import Piece from './Piece';
import useGame from '../../hooks/useGame';

export default function Pieces() {
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
      />
      <Piece
        { ...submarine }
      />
      <Piece
        { ...destroyer }
      />
      <Piece
        { ...battleship }
      />
      <Piece
        { ...carrier }
      />
    </>
  );
};