import store from '../store';
import { isName, isId } from '../../validation';
import { MAX_SESSIONS } from 'settings';

export default function join({
  playerId,
  playerName,
  gameId,
}, socket) {
  if (!isId(playerId)) return { success: false };
  if (!isName(playerName)) return { success: false };
  if (!store.exists(gameId)) return { success: false };
  if (store.sessionSize(playerId) > MAX_SESSIONS) return { success: false };

  const game = store.get(gameId);
  if (game.hasPlayer(playerId)) {
    socket.join(gameId);
    return game.format(playerId);
  }
  if (game.hasAvailability(playerId)) {
    socket.join(gameId);
    game.addPlayer({ playerId, playerName });
    return game.format(playerId);
  }
  
  return { success: false };
};