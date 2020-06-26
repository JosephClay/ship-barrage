import store from '../store';
import { isName, isId } from '../../validation';
import { MAX_SESSIONS } from 'settings';

export default function create({ playerId, playerName }, socket) {
  if (!isId(playerId)) return { success: false };
  if (!isName(playerName)) return { success: false };
  if (store.sessionSize(playerId) > MAX_SESSIONS) return { success: false };
  
  const game = store.create();
  game.addPlayer({ playerId, playerName });

  socket.join(game.id());

  return game.format(playerId);
};