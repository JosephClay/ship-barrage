import React from 'react';
import title, { subtitle } from './title.style';

export default function Title() {
  return (
    <h1 css={ title }>
      SHIP BARRAGE
      <small css={ subtitle }>
        a simple Battleship<sup>TM</sup> clone
      </small>
    </h1>
  );
};