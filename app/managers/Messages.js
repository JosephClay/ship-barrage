import uniqueId from 'utils/uniqueId';
import {
  STATE_END,
  STATE_ACTIVE,
  SOUND_CHIME,
} from 'settings';

export default function Messages({
  playerId,
  messages,
  sessions,
  notifications,
  audio,
}) {
  const send = (gameId, message) => {
    notifications.send(`Ship Barrage: ${message}`);
    messages.push({
      id: uniqueId(),
      gameId,
      message,
    });

    audio.play(SOUND_CHIME);
  };

  return {
    state(id, state) {
      const game = sessions.get([{ id }]);
      // dont have the game
      if (!game) return;

      if (state === STATE_ACTIVE) return send(id, `Ready to play with ${game.opponent}`);
      if (state === STATE_END) return send(id, `Game over. See who won!`);
    },

    attack(id, turnId) {
      const game = sessions.get([{ id }]);
      
      // dont have the game
      if (!game) return;
      
      // no reason to notify someone of the other player's turn
      if (turnId !== playerId.get()) return;

      send(id, `Your turn against ${game.opponent}`);
    },

    remove(id) {
      messages.unset([{ id }]);
    },
  };
};