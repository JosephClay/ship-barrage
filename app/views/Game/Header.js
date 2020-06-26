import React from 'react';
import signal from 'signal-js';
import header from './header.style';

const onHome = () => signal.emit('home');

export default function Header() {
  return (
    <h1 css={ header } onClick={ onHome }>
      SHIP BARRAGE
    </h1>
  );
};