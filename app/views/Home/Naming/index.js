import React, { useRef, useState } from 'react';
import signal from 'signal-js';
import useKeyPress from '../../hooks/useKeyPress';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useStore } from '@immutabl3/store/react';
import { isName } from '../../../../validation';
import { PAT_IS_NAME } from 'settings';

export default function Naming() {
  const ref = useRef();
  const initialName = useStore(['playerName']);
  const [name, changeName] = useState(isName(initialName) ? initialName : '');
  const valid = isName(name);
  const pressed = useKeyPress('Escape');
  if (pressed) signal.emit('name:cancel');

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') ref.current.submit();
  };

  const onChange = ({ target: { value } }) => {
    changeName(value.trim());
  };

  return (
    <form
      ref={ ref }
      spellCheck={ false }
      onSubmit={ e => {
        e.preventDefault();
        signal.emit('name:submit', name);
      } }
    >
      <label>
        Enter your name:
        <Input
          value={ name }
          type="text"
          placeholder="Name"
          minLength={ 1 }
          maxLength={ 20 }
          autoFocus={ true }
          pattern={ PAT_IS_NAME }
          onKeyDown={ onKeyDown }
          onChange={ onChange }
        />
      </label>
      <Button
        block={ true }
        variant="primary"
        disabled={ !valid }
        type="submit"
      >
        NEXT
      </Button>
    </form>
  );
};