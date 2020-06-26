import React from 'react';
import isTouch from '../../compatibility/isTouch';

export default function Interact() {
  return (
    <span>
      { isTouch ? 'Tap' : 'Click' }
    </span>
  );
};