import React from 'react';
import signal from 'signal-js';
import Sound from '../icons/Sound';
import IconButton from '../components/IconButton';
import useStore from '../hooks/useStore';

const onToggle = () => signal.emit('sound:toggle');

export default function SoundButton(props) {
  const active = useStore(['sound']);

  return (
    <IconButton
      {...props}
      data-tooltip="SOUND"
      data-active={ `${active}` }
      onClick={ onToggle }
    >
      <Sound />
    </IconButton>
  );
};