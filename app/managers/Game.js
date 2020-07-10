import { isName } from '../../validation';
import route from '../common/route';
import key from '../../battleship/key';
import { map as ships } from '../../battleship/ships';
import signal from 'signal-js';
import {
  HIT,
  STATE_HOME,
  STATE_PLAYING,
  STATE_SHARING,
  STATE_JOINING,
  STATE_ACTIVE,
  SOUND_HIT,
  SOUND_MISS,
  SOUND_HOVER,
} from 'settings';

const Game = ({
  store,
  name,
  services,
  messages,
  sessions,
  audio,
  socket,
}) => {
  const id = () => global.location.pathname.substr(1);

  socket.on('attack', ({
    id,
    result,
    coords,
    turnId: newTurnId,
    playerId: attackingPlayerId,
  }) => {
    const currentGameId = store.get(['game', 'id']);
    // not the current game, show a message that someone attacked changed
    if (id !== currentGameId) return messages.attack(id, newTurnId);
    
    // update turn
    store.set(['game', 'turn'], newTurnId);
    // is this a hit?
    const isHit = result === HIT;
    // play the appropriate sound
    audio.play(isHit ? SOUND_HIT : SOUND_MISS);
    // show the effect
    signal.emit('effect:attack', isHit, coords);
    // are we the attacker...
    const didWeAttack = store.get('playerId') === attackingPlayerId;
    // because affects were we save the action
    const saveToLocation = didWeAttack ? 'screen' : 'map';
    // save the result
    store.set(['game', saveToLocation, key(coords)], result);
    // record the hit
    didWeAttack && isHit && store.set(['game', 'hits'], store.get(['game', 'hits']) + 1);
  });

  socket.on('game:state', ({ id, state }) => {
    const currentGame = store.get(['game', 'id']);
    // not the current game, show a message that the game state changed
    if (currentGame !== id) return messages.state(id, state);
    store.set(['game', 'state'], state);
  });

  socket.on('redirect', async function({ fromId, toId }) {
    const currentGame = store.get(['game', 'id']);

    if (currentGame !== fromId) return;
    
    store.set('loading', true);

    const game = await services.join(toId);
    
    console.log(game);

    // error
    if (game.success === false) {
      route.clear();
      return store.set('state', STATE_HOME);
    }
    
    route.set(toId);

    store.merge({
      game,
      loading: false,
      state: STATE_PLAYING,
    });
  });

  return {
    async setup() {
      const gameId = id();

      if (!gameId) return store.set('loading', false);

      if (!isName(store.get('playerName'))) {
        store.set('loading', false);
        store.set('initialized', true);
        await name.request();
      }

      const game = await services.join(gameId);
      
      console.log(game);

      if (!game) {
        route.clear();
        return store.set('loading', false);
      }

      store.merge({
        game,
        loading: false,
        state: STATE_PLAYING,
      });
    },

    async play() {
      if (!store.get('playerName')) await name.request();

      store.set('loading', true);
      const game = await services.create();
      route.set(game.id);
      store.merge({
        game,
        loading: false,
        state: STATE_SHARING,
      });
      sessions.add(game);
    },

    async join(gameId) {
      if (!gameId) {
        if (!store.get('playerName')) await name.request();
        return store.set('state', STATE_JOINING);
      }

      // with id
      store.set('loading', true);

      const game = await services.join(gameId);
      console.log(game);
      // error
      if (game.success === false) {
        route.clear();
        return store.set('state', STATE_HOME);
      }
      
      route.set(gameId);

      store.merge({
        game,
        loading: false,
        state: STATE_PLAYING,
      });
    },

    attack() {
      const coords = store.get(['pointer', 'coords']);

      // attack has already been made to these coords
      const screen = store.get(['game', 'screen']);
      if (screen[key(coords)] !== undefined) return;

      socket.send('player:attack', { coords });
    },

    replay() {
      store.set('loading', true);
      socket.send('replay');
    },
    
    leave() {
      route.clear();
      store.set('state', STATE_HOME);
      socket.send('leave');
    },

    hover() {
      const state = store.get(['state']);
      if (state !== STATE_PLAYING) return;

      const gameState = store.get(['game', 'state']);
      if (gameState !== STATE_ACTIVE) return;

      audio.play(SOUND_HOVER);
    },
  };
};

Game.get = () => ({
  id: '',
  board: {},
  hits: -1,
  map: {},
  opponentName: '',
  playerId: '',
  playerState: '',
  screen: {},
  ships: ships(),
  state: '',
  time: -1,
  turn: '',
});

export default Game;