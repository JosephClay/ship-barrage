import request from 'socket-request/client';

export default function Services(store, socket) {
  const req = request(socket);

  return {
    async create() {
      try {
        const game = await req('create', {
          playerId: store.get('playerId'),
          playerName: store.get('playerName'),
        });
        if (!game || game.success === false) return;
        return game;
      } catch (err) {
        console.error(err);
      }
    },
    async join(gameId = store.get(['game', 'id'])) {
      try {
        const game = await req('join', {
          gameId,
          playerId: store.get('playerId'),
          playerName: store.get('playerName'),
        });
        if (!game || game.success === false) return;
        return game;
      } catch (err) {
        console.error(err);
      }
    },
    async sessions() {
      try {
        return await req('sessions', {
          playerId: store.get('playerId'),
        });
      } catch (err) {
        console.error(err);
        return [];
      }
    },
  };
};