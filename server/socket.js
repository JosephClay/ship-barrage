import store from './store';
import create from './controllers/create';
import join from './controllers/join';
import sessions from './controllers/sessions';
import request from 'socket-request/server';
import Game from './Game';
import { isId } from '../validation';

const validation = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.id || !isId(socket.handshake.query.id)) return next(new Error('Authentication error'));
  next();
};

export default io => {
  io.use(validation);

  io.on('connection', socket => {
    const id = socket.handshake.query.id;
    
    const response = request(socket);
    response('create', create);
    response('join', join);
    response('sessions', sessions);
    
    Game(io, socket);

    store.getSessions(id).forEach(game => {
      socket.join(game.id());
    });
  });
};