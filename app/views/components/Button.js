import React from 'react';
import signal from 'signal-js';
import button from './button.style';
import {
  SOUND_HOVER,
  SOUND_CLICK,
} from 'settings';

export default function Button(props) {
  const {
    variant,
    block,
    onClick,
    ...rest
  } = props;
  return (
    <button
      css={ button(variant, block) }
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