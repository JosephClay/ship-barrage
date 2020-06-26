import React from 'react';
import signal from 'signal-js';
import Button from '../../components/Button';
import readyButton from './readyButton.style';

const onReady = () => signal.emit('player:ready');

export default function ReadyButton() {
  return (
    <Button css={ readyButton } onClick={ onReady }>
      Ready
    </Button>
  );
};