import io from 'socket.io-client/dist/socket.io.slim.js';
import route from './common/route';
import isFunction from 'utils/isFunction';
import parser from 'socket.io-msgpack-parser';

export default function socket(store) {
  const socket = io({
    parser,
    transports: ['websocket'],
    query: { id: store.get('playerId') },
  });

  socket.on('disconnect', () => route.reload());
  socket.on('reconnect', () => route.reload());

  const send = socket.emit.bind(socket);
  
  socket.send = (action, obj, fn) => {
    if (isFunction(obj)) {
      // eslint-disable-next-line no-param-reassign
      fn = obj;
      // eslint-disable-next-line no-param-reassign
      obj = {};
    }

    send(action, {
      playerId: store.get('playerId'),
      gameId: store.get(['game', 'id']),
      ...obj,
    }, fn);
  };

  return socket;
};