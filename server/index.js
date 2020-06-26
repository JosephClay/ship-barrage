import { promisify } from 'util';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import socketio from 'socket.io';
import socket from './socket';
import ratelimit from './ratelimit';
import store from './store';
import service from './service';
import compress from 'compression';
import expressSslify from 'express-sslify';
import home from './controllers/home';
import parser from 'socket.io-msgpack-parser';
import expressStatic from 'express-static-gzip';
import {
  SSL,
  PORT,
  IS_PROD,
  STATIC,
  STATIC_GZIP,
} from './config';

export default async function start() {
  const app = express();
  const server = http.Server(app);
  const io = socketio(server, { parser });
  const listen = promisify(server.listen.bind(server));

  SSL && app.use(expressSslify.HTTPS({ trustProtoHeader: true }));
  IS_PROD && app.use(ratelimit);
  app.use(helmet());
  app.use(compress());
  app.use(favicon(`./assets/favicons/favicon.ico`));
  app.use('/assets', express.static('assets', STATIC));
  app.use('/public', expressStatic('public', STATIC_GZIP));
  app.use(home);

  await service.connect();
  await store.prime();
  await socket(io);
  await listen(PORT);
  console.log(`[SERVER] ${PORT}`);
  return app;
};