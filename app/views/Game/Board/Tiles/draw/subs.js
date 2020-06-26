export default function lines(ctx, size) { 
  const center = ~~(size / 2);

  ctx.globalAlpha = 0.1;

  ctx.fillRect(center, 0, 1, size);
  ctx.fillRect(0, center, size, 1);
};
