import subsubs from './subsubs';
import subs from './subs';
import seps from './seps';
import bloom from './bloom';
import { COLOR_WHITE } from 'theme';

export default function draw(ctx, size, minimized) {
  ctx.clearRect(0, 0, size, size);
  
  ctx.fillStyle = COLOR_WHITE;

  !minimized && subsubs(ctx, size);
  !minimized && subs(ctx, size);
  seps(ctx, size);
  !minimized && bloom(ctx, size);
};