import React, { useMemo } from 'react';
import useBoardPlacement from '../../hooks/useBoardPlacement';
import Container from './Container';
import Cursor from './Cursor';
import Border from './Border';
import Pips from './Pips';
import Tiles from './Tiles';
import Waves from './Waves';
import { CELL_COUNT } from 'settings';

export default function Board({
  cursor,
  waves,
  minimized,
  attacks,
  offset,
}) {  
  const { size, x, y } = useBoardPlacement({
    minimized,
    offset,
  });

  const cellSize = size / CELL_COUNT;
  const getPosition = useMemo(() => coord => coord * cellSize, [cellSize]);

  return (
    <Container size={ size } x={ x } y={ y }>
      { cursor && <Cursor cellSize={ cellSize } getPosition={ getPosition } /> }
      <Tiles
        size={ size }
        cellSize={ cellSize }
        minimized={ minimized }
      />
      <Border size={ size } />
      { !minimized && <Pips getPosition={ getPosition } /> }
      { waves && <Waves attacks={ attacks } cellSize={ cellSize } getPosition={ getPosition } /> }
    </Container>
  );
};