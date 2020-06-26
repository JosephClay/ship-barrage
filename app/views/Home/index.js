import React from 'react';
import signal from 'signal-js';
import Sharing from './Sharing';
import Naming from './Naming';
import Sessions from './Sessions';
import Join from './Join';
import ActionArea from './ActionArea';
import Title from './Title';
import Welcome from './Welcome';
import ActionBar from './ActionBar';
import Button from '../components/Button';
import Background from './Background';
import { MAX_SESSIONS } from 'settings';
import useStore from '../hooks/useStore';
import useViewState from '../hooks/useViewState';

const onPlay = () => signal.emit('play');
const onJoin = () => signal.emit('join');

export default function Home() {
  const sessions = useStore(['sessions']);
  const {
    isHome,
    isMainMenu,
    isNaming,
    isSharing,
    isJoining,
  } = useViewState();

  return (
    <>
      <ActionArea active={ isMainMenu }>
        <Title />
        <Welcome />
        <ActionBar>
          <Button
            disabled={ sessions.length >= MAX_SESSIONS }
            variant="primary"
            block={ true }
            onClick={ onPlay }
          >
            PLAY
          </Button>
          <Button
            disabled={ sessions.length >= MAX_SESSIONS }
            variant="primary"
            block={ true }
            onClick={ onJoin }
          >
            JOIN
          </Button>
        </ActionBar>
        <Sessions sessions={ sessions } />
      </ActionArea>
      <ActionArea active={ isNaming } position="bottom">
        <Naming />
      </ActionArea>
      <ActionArea active={ isSharing } position="bottom">
        <Sharing />
      </ActionArea>
      <ActionArea active={ isJoining } position="bottom">
        <Join />
      </ActionArea>
      <Background
        active={ isHome }
      />
    </>
  );
};