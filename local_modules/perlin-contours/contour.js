export default function contour(ctx, vertices) {
  ctx.save();
  const [x, y] = vertices[0];
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let idx = 1; idx < vertices.length; idx++) {
    const vert = vertices[idx];
    ctx.lineTo(vert[0], vert[1]);
  }
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};