export default function subsubs(ctx, size) { 
  const offsetNear = ~~(size / 4);
  const offsetFar = size - offsetNear;

  ctx.globalAlpha = 0.05;

  ctx.fillRect(offsetNear, 0, 1, size);
  ctx.fillRect(offsetFar, 0, 1, size);

  ctx.fillRect(0, offsetNear, size, 1);
  ctx.fillRect(0, offsetFar, size, 1);
};
