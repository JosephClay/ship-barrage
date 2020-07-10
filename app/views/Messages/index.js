import React from 'react';
import Message from './Message';
import styles from './messages.style';
import { useStore } from '@immutabl3/store/react';

export default function Messages() {
  const messages = useStore(['messages']);
  
  return (
    <div css={ styles }>
      { messages.map(({ id, gameId, message }) => {
        return (
          <Message
            key={ id }
            id={ id }
            gameId={ gameId }
            message={ message }
          />
        );
      }) }
    </div>
  );
};