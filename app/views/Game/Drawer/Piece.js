import React from 'react';
import Container from './Container';
import Segments from './Segments';
import ships from '../../ships';
import Rotation from '../../ships/Rotation';

export default function Piece(props) {
  const {
    type,
    orientation,
    length,
    disabled,
  } = props;
  
  const Ship = ships.get(type);
  return (
    <Container {...props} disabled={ disabled }>
      <Rotation orientation={ orientation }>
        <Segments
          type={ type }
          orientation={ orientation }
          length={ length }
        />
        <Ship />
      </Rotation>
    </Container>
  );
};