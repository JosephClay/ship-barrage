import store from './store';
import { isName } from '../validation';
import {
  STATE_READY,
  STATE_END,
  STATE_ACTIVE,
} from 'settings';

const attempt = fn => (
  (config, res) => {
    try {
      fn(config, res);
    } catch (err) {
      console.error('Game', err);
    }
  }
);

export default function Game(io, socket) {
  const toGame = id => io.to(id);

  socket.on('piece:place', attempt((config, res) => {
    const game = store.get(config.gameId);
    const success = game.placePiece(config);
    res({ success });
    store.save(game);
  }));

  socket.on('piece:unplace', attempt((config, res) => {
    const game = store.get(config.gameId);
    game.unplacePiece(config);
    store.save(game);
    res && res();
  }));

  socket.on('player:rename', attempt(({
    playerId,
    playerName,
  }) => {
    if (!isName(playerName)) return { success: false };

    const games = store.getSessions(playerId);
    games.forEach(game => {
      game.updatePlayerName({ playerId, playerName });
      store.save(game);

      socket.to(game.id()).emit('name:change', {
        name: playerName,
        id: game.id(),
      });
    });
  }));

  socket.on('player:ready', attempt((config, res) => {
    const { gameId } = config;
    const game = store.get(gameId);
    const success = game.setPlayerReady(config.playerId);
    
    res({ success });

    // ready to start playing
    if (game.state() === STATE_READY) {
      game.start();
      toGame(gameId).emit('game:state', {
        id: gameId,
        state: STATE_ACTIVE,
      });
    }

    store.save(game);
  }));
  
  socket.on('player:attack', attempt(config => {
    const { gameId } = config;
    const game = store.get(gameId);
    const result = game.attack(config);
    
    // unsuccessful
    if (!result) return;

    store.save(game);

    // broadcast to the player and opponent
    toGame(gameId).emit('attack', {
      id: gameId,
      result,
      coords: config.coords,
      turnId: game.turn(),
      playerId: config.playerId,
    });

    if (game.state() === STATE_END) {
      toGame(gameId).emit('game:state', {
        id: gameId,
        state: STATE_END,
      });
    }
  }));

  socket.on('replay', attempt(({ gameId }) => {
    const game = store.clone(store.get(gameId));

    // broadcast the new game to the players
    toGame(gameId).emit('redirect', {
      fromId: gameId,
      toId: game.id(),
    });

    // remove the game
    store.remove(gameId);
  }));

  socket.on('leave', attempt(({ gameId }) => {
    // remove the game
    store.remove(gameId);
  }));
};