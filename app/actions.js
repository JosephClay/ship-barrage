import signal from 'signal-js';
import Game from './managers/Game';
import route from './common/route';
import { STATE_HOME, STATE_PLAYING } from 'settings';

export default function actions({
  store,
  name,
  vessels,
  tutorial,
  pointer,
  player,
  game,
  audio,
  notifications,
  messages,
}) {
  signal.on('tutorial:open', tutorial.open);
  signal.on('tutorial:close', tutorial.close);

  signal.on('pointer:move', e => {
    pointer.move(e);
    vessels.move(e);
  });
  signal.on('drop:leave', vessels.leave);
  signal.on('drop:start', vessels.dropStart);
  signal.on('ship:rotate', vessels.rotate);

  signal.on('name:change', name.request);
  signal.on('name:submit', name.set);
  signal.on('name:cancel', name.cancel);
  
  signal.on('home', () => {
    route.clear();
    store.set('state', STATE_HOME);
    store.set('game', Game.get());
  });

  signal.on('play', game.play);
  signal.on('join', game.join);
  signal.on('replay', game.replay);
  signal.on('leave', game.leave);

  signal.on('notifications:toggle', notifications.toggle);
  
  signal.on('message:remove', messages.remove);
  signal.on('message:activate', (id, gameId) => {
    messages.remove(id);
    game.join(gameId);
  });

  signal.on('sound', audio.play);
  signal.on('sound:toggle', audio.toggle);

  signal.on('share:exit', () => {
    store.set('state', STATE_HOME);
    route.clear();
  });

  signal.on('share:start', () => {
    store.set('state', STATE_PLAYING);
  });

  signal.on('player:ready', player.ready); 
  signal.on('player:attack', game.attack);
};