import * as Comlink from 'comlink';
import worker from './index.worker';
import draw from './draw';

const SIZE = 2000;

const generate = Comlink.wrap(worker());

const toBlob = canvas => (
  new Promise(resolve => canvas.toBlob(resolve))
);

const loadImage = url => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
};

export default async function perlinContours(seed) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = SIZE;
  canvas.height = SIZE;
  
  const contours = await generate(seed);
  
  ctx.save();
  ctx.strokeStyle = `#fff`;
  await draw(ctx, contours);
  ctx.restore();

  const blob = await toBlob(canvas);
  const objectUrl = URL.createObjectURL(blob);

  return loadImage(objectUrl);
};