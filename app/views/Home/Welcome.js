import React from 'react';
import signal from 'signal-js';
import Name from '../components/Name';
import { isName } from '../../../validation';
import welcome from './welcome.style';
import useStore from '../hooks/useStore';

const onNameChange = () => signal.emit('name:change');

export default function Welcome() {
  const name = useStore(['playerName']);

  if (!isName(name)) return null;

  return (
    <p css={ welcome }>
      Welcome <Name name={ name } />!
      <small>
        <a onClick={ onNameChange }>
          Not You?
        </a>
      </small>
    </p>
  );
};