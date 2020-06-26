import React from 'react';
import signal from 'signal-js';
import iconButton from './iconButton.style';
import {
  SOUND_HOVER,
  SOUND_CLICK,
} from 'settings';

export default function IconButton(props) {
  const {
    onClick,
    ...rest
  } = props;
  return (
    <button
      css={ iconButton }
      {...rest}
      onMouseEnter={ () => {
        signal.emit('sound', SOUND_HOVER);
      } }
      onClick={ e => {
        signal.emit('sound', SOUND_CLICK);
        onClick && onClick(e);
      } }
    />
  );
};