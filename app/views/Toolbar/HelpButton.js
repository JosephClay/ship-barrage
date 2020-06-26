import React from 'react';
import signal from 'signal-js';
import Help from '../icons/Help';
import IconButton from '../components/IconButton';

const onTutorialOpen = () => signal.emit('tutorial:open');

export default function HelpButton(props) {
  return (
    <IconButton
      {...props}
      data-tooltip="HOW TO PLAY"
      onClick={ onTutorialOpen }
    >
      <Help />
    </IconButton>
  );
};