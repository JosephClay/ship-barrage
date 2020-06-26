import React from 'react';
import signal from 'signal-js';
import useKeyPress from '../../hooks/useKeyPress';
import useGame from '../../hooks/useGame';
import sharing, { input, nav, button } from './sharing.style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CopyButton from './CopyButton';
import BackButton from './BackButton';

const onStart = () => signal.emit('share:start');
const onChange = e => e.preventDefault();
const onFocus = e => e.target.select();

export default function Sharing() {
  const { id = '' } = useGame();

  const pressed = useKeyPress('Escape');
  if (pressed) signal.emit('share:exit');

  return (
    <section css={ sharing }>
      <p>
        Share this game code:
      </p>
      <Input
        css={ input }
        value={ id }
        autoFocus={ true }
        onChange={ onChange }
        onFocus={ onFocus }
      />
      <nav css={ nav }>
        <BackButton
          css={ button }
        />
        <CopyButton
          id={ id }
          css={ button }
        />
        <Button
          css={ button }
          variant="primary"
          block={ true }
          onClick={ onStart }
        >
          START
        </Button>
      </nav>
    </section>
  );
};