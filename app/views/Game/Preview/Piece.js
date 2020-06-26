import React from 'react';
import Container from './Container';
import { icon } from './piece.style';
import ships from '../../ships';

export default function Piece(props) {
  const { type } = props;
  const Ship = ships.get(type);
  
  return (
    <Container {...props}>
      <Ship css={ icon } />
    </Container>
  );
};