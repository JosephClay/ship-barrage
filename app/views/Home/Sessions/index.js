import React from 'react';
import sortBy from 'utils/sortBy';
import Session from './Session';
import style from './sessions.style';
import { useStore } from '@immutabl3/store/react';
import { MAX_SESSIONS } from 'settings';

const sortByTime = sortBy('time');

export default function Sessions({ sessions }) {
  const playerId = useStore(['playerId']);

  if (!sessions.length) return null;

  return (
    <nav css={ style }>
      <small>
        { sessions.length < MAX_SESSIONS ? 'Your active games:' : 'Max sessions reached' }
      </small>
      { [...sessions]
        .sort(sortByTime)
        .map(game => (
          <Session
            {...game}
            key={ game.id }
            playerId={ playerId }
          />
        )) }
    </nav>
  );
};