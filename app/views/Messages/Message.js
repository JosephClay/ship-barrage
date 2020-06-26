import React, { useEffect } from 'react';
import signal from 'signal-js';
import Button from '../components/Button';
import Close from '../icons/Close';
import style from './message.style';
import useAnimation from '../hooks/useAnimation';

const onRemove = id => signal.emit('message:remove', id);
const onActivate = (id, gameId) => signal.emit('message:activate', id, gameId);

export default function Message({ id, gameId, message }) {
  const animation = useAnimation(500);

  // auto-remove after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => onRemove(id), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Button
      css={ style }
      onClick={ () => onActivate(id, gameId) }
      style={ { opacity: animation } }
    >
      <span onClick={ e => {
        e.stopPropagation();
        onRemove(id);
      } }>
        <Close />
      </span>
      { gameId }: { message }
    </Button>
  );
};