// https://codepen.io/mintu-/pen/NMKwRy

import Drop from './Drop';

const DROPS = 1024;

export default function Snowfall(w, h) {
  let width = w;
  let height = h;
  
  const drops = [];
 
  const populate = () => {
    let idx = DROPS;
    while (idx--) {
      drops.push(new Drop(width, height));
    }
  };
   
  return {
    resize(w, h) {
      width = w;
      height = h;
      drops.length = 0;
      populate();
    },
    render(ctx) {
      ctx.clearRect(0, 0, width, height);
      for (const drop of drops) {
        drop.draw(ctx).update(DROPS);
      }
    },
  };
};