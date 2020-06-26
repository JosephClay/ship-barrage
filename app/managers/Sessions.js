const parse = (sessions = []) => {
  return sessions
    .map(([time, id, gameState, turn, playerState, opponent]) => ({
      time,
      id,
      turn,
      gameState,
      playerState,
      opponent,
    }));
};

export default function Sessions(store, services, socket) {
  socket.on('attack', ({
    id,
    turnId,
  }) => {
    const session = store.select([{ id }]);
    if (!session.exists()) return;
    session.set('turn', turnId);
  });

  socket.on('game:state', ({ id, state }) => {
    const session = store.select([{ id }]);
    if (!session.exists()) return;
    session.set('gameState', state);
  });

  const setup = async function() {
    const serverSessions = await services.sessions();
    const userSessions = parse(serverSessions);
    store.set(userSessions);
  };

  setup();
  
  return {
    add(game) {
      const session = store.select([{ id: game.id }]);
      if (session.exists()) return;
      store.push({
        time: game.time,
        id: game.id,
        turn: game.turn,
        gameState: game.state,
        playerState: game.playerState,
        opponent: game.opponentName,
      });
    },
    update(id, key, value) {
      const session = store.select([{ id }]);
      if (!session.exists()) return;
      session.set(key, value);
    },
  };
};