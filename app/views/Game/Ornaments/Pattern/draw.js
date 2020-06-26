import { COLOR_WHITE } from 'theme';
import {
  PIXEL,
  LONG,
  SHORT,
} from '../../../../static/pattern.json';
import {
  HORIZONTAL,
  VERTICAL,
} from 'settings';

const painters = new Map([
  [HORIZONTAL, (ctx, pattern) => {
    pattern.forEach((type, idx) => {
      const offset = idx * 2;
      if (type === PIXEL) {
        ctx.fillRect(offset, 0, 2, 1);
      } else {
        ctx.fillRect(offset, 0, 1, type === LONG ? 5 : type === SHORT ? 3 : 1);
      }
    });
  }],
  [VERTICAL, (ctx, pattern) => {
    pattern.forEach((type, idx) => {
      const offset = idx * 2;
      if (type === PIXEL) {
        ctx.fillRect(0, offset, 1, 2);
      } else {
        ctx.fillRect(0, offset, type === LONG ? 5 : type === SHORT ? 3 : 1, 1);
      }
    });
  }],
]);

export default function draw(ctx, type, width, height, pattern) {
  ctx.clearRect(0, 0, width, height);
  
  ctx.fillStyle = COLOR_WHITE;

  const painter = painters.get(type);
  painter(ctx, pattern);
};