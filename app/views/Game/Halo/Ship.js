import React from 'react';
import Container from './Container';
import Ships from '../../ships';
import Rotation from '../../ships/Rotation';

export default function Ship({
  ships,
  drag,
}) {
  const Ship = Ships.get(drag.type);
  const ship = ships[drag.type];
  return (
    <Container {...ship} drag={ drag } ships={ ships }>
      <Rotation orientation={ ship.orientation }>
        <Ship />
      </Rotation>
    </Container>
  );
};