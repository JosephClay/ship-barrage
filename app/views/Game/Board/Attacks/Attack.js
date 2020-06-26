import React from 'react';
import {
  COLOR_SOLID_PINK,
  COLOR_MINE_SHAFT,
} from 'theme';

export default function Attack({
  x,
  y,
  width,
  height,
  attack,
}) {
  return (
    <div
      style={ {
        position: 'absolute',
        width,
        height,
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: attack === 1 ? COLOR_SOLID_PINK : COLOR_MINE_SHAFT,
      } }
    />
  );
};