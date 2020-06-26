import React, { useRef, useEffect } from 'react';
import actionArea from './actionArea.style';
import signal from 'signal-js';
import { SOUND_TRANSITION } from 'settings';

export default function ActionArea({ active, position, children }) {
  const activeRef = useRef(active);
  
  useEffect(() => {
    // activating
    if (!activeRef.current && active) signal.emit('sound', SOUND_TRANSITION);
    activeRef.current = active;
  }, [active]);

  return (
    <div
      css={ actionArea }
      data-active={ `${active}` }
      data-position={ position }
    >
      { children }
    </div>
  );
};