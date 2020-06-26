import serve from 'koa-static-server';
import { MAX_AGE } from './settings';

export default (route, dir) => (
  serve({
    rootDir: dir,
    rootPath: route,
    maxage: MAX_AGE,
  })
);