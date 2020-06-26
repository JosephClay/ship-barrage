import React from 'react';
import copyButton, { icon } from './backButton.style';
import IconButton from '../../components/IconButton';
import ArrowLeft from '../../icons/ArrowLeft';
import signal from 'signal-js';

const onHome = e => {
  e.preventDefault();
  signal.emit('home');
};

export default function BackButton(props) {
  return (
    <IconButton
      css={ copyButton }
      onClick={ onHome }
      {...props}
    >
      <ArrowLeft css={ icon } />
    </IconButton>
  );
};