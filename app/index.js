import register from './service-register';

import React from 'react';
import { render } from 'react-dom';
import io from './io';
import App from './views/App';
import stats from './views/stats';
import actions from './actions';
import createStore from './createStore';
import Services from './Services';

import Vessels from './managers/Vessels';
import Tutorial from './managers/Tutorial';
import Name from './managers/Name';
import Board from './managers/Board';
import Screen from './managers/Screen';
import Pointer from './managers/Pointer';
import Audio from './managers/Audio';
import Sessions from './managers/Sessions';
import Player from './managers/Player';
import Game from './managers/Game';
import Visibility from './managers/Visibility';
import Notifications from './managers/Notifications';
import Stats from './managers/Stats';
import Messages from './managers/Messages';

const start = async function() {
  process.env.NODE_ENV === 'production' && register();
  
  const store = createStore();
  const socket = io(store);
  const services = Services(store, socket);

  const pointer = Pointer(
    store.select('pointer'),
    store.select('screen'),
    store.select('board'),
  );
  
  const audio = Audio(store.select('sound'));

  const vessels = Vessels({
    pointer: store.select('pointer'),
    drag: store.select('drag'),
    ships: store.select(['game', 'ships']),
    audio,
    socket,
  });

  Board(store.select('screen'), store.select('board'));

  Screen(store.select('screen'));

  Stats(
    store.select(['game', 'map']),
    store.select(['game', 'ships']),
    store.select(['stats']),
  );

  const sessions = Sessions(
    store.select('sessions'),
    services,
    socket,
  );

  const visibility = Visibility();

  const notifications = Notifications(store.select('notifications'), visibility);

  const messages = Messages({
    playerId: store.select('playerId'),
    messages: store.select('messages'),
    sessions: store.select('sessions'),
    notifications,
    audio,
  });

  const tutorial = Tutorial(store.select('tutorial'));

  const name = Name(
    store.select('state'),
    store.select('playerName'),
    socket,
  );

  const game = Game({
    store,
    name,
    services,
    messages,
    sessions,
    audio,
    socket,
  });

  const player = Player(store, socket);

  pointer.on('coords:change', game.hover);
  
  actions({
    store,
    audio,
    vessels,
    name,
    tutorial,
    pointer,
    player,
    game,
    notifications,
    messages,
  });

  render(<App store={ store } />, document.querySelector('#mount'));
  stats();

  await game.setup();
  store.set('initialized', true);
};

start();