import React, { useState } from 'react';
import signal from 'signal-js';
import join, { nav, button } from './join.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import BackButton from './BackButton';

export default function Join() {
  const [id, setId] = useState('');

  return (
    <form
      css={ join }
      spellCheck={ false }
      onSubmit={ e => {
        e.preventDefault();
        signal.emit('join', id);
      } }
    >
      <p>
        Enter your game code:
      </p>
      <Input
        value={ id }
        pattern="[A-Za-z0-9]+"
        minLength={ 5 }
        maxLength={ 5 }
        autoFocus={ true }
        onChange={ e => setId(e.target.value) }
      />
      <nav css={ nav }>
        <BackButton
          css={ button }
        />
        <Button
          css={ button }
          type="submit"
          variant="primary"
          block={ true }
        >
          PLAY
        </Button>
      </nav>
    </form>
  );
};