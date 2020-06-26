import store from '../store';
import { isId } from '../../validation';

const serialize = (playerId, sessions) => {
  return sessions.map(game => {
    return [
      game.time(),
      game.id(),
      game.state(),
      game.turn(),
      game.getPlayer(playerId).state,
      game.getOpponentName(playerId),
    ];
  });
};

export default function sessions({
  playerId,
},) {
  if (!isId(playerId)) return [];
  const sessions = store.getSessions(playerId);
  return serialize(playerId, sessions);
};