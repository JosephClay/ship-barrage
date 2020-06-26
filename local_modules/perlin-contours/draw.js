import contour from './contour';

export default function draw(ctx, contours) {
  let idx = contours.length;
  return new Promise(resolve => {
    const loop = () => {
      idx--;
      if (idx < 0) return resolve();
      contour(ctx, contours[idx]);
      requestAnimationFrame(loop);
    };

    loop();
  });
};