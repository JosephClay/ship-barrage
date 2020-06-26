export default function seps(ctx, size) { 
  ctx.globalAlpha = 0.15;
  
  ctx.fillRect(size - 1, 0, 1, size);
  ctx.fillRect(0, size - 1, size, 1);
};
