export default function bloom(ctx, size) { 
  const center = ~~(size / 2);

  ctx.globalAlpha = 0.5;

  ctx.fillRect(center, center, 1, 1);

  ctx.globalAlpha = 0.35;
  
  ctx.fillRect(center + 1, center, 1, 1);
  ctx.fillRect(center - 1, center, 1, 1);
  ctx.fillRect(center, center + 1, 1, 1);
  ctx.fillRect(center, center - 1, 1, 1);
  
  ctx.globalAlpha = 0.25;
  
  ctx.fillRect(center + 2, center, 1, 1);
  ctx.fillRect(center - 2, center, 1, 1);
  ctx.fillRect(center, center + 2, 1, 1);
  ctx.fillRect(center, center - 2, 1, 1);
};
