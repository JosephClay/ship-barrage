// https://codepen.io/whqet/pen/Auzch

import Firework from './Firework';
import { COLOR_BLACK } from 'theme';
import rgba from 'utils/rgba';
import random from 'utils/random';

const { document } = global;

export default function Fire(w, h) {
  let width = w;
  let height = h;

  // firework collection
  const fireworks = [];
  // particle collection
  const particles = [];
  // starting hue
  let hue = 120;
  // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
  const limiterTotal = 5;
  let limiterTick = 0;
  // this will time the auto launches of fireworks, one launch per 80 loop ticks
  const timerTotal = 80;
  let timerTick = 0;
  let mousedown = false;
  // mouse x coordinate,
  let mx;
  // mouse y coordinate
  let my;

  // main demo loop
  const render = ctx => {   
    // create random color
    hue = random(0, 360);
    
    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = rgba(COLOR_BLACK, 0.5);
    ctx.fillRect(0, 0, width, height);
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = 'lighter';
    
    // loop over each firework, draw it, update it
    let idx = fireworks.length;
    while (idx--) {
      fireworks[idx]
        .draw(ctx, hue)
        .update(idx, particles, fireworks, hue);
    }
    
    // loop over each particle, draw it, update it
    let index = particles.length;
    while (index--) {
      particles[index].draw(ctx).update(particles, index);
    }
    
    // launch fireworks automatically to random coordinates, when the mouse isn't down
    if (timerTick >= timerTotal) {
      if (!mousedown) {
        // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
        fireworks.push(new Firework(width / 2, height, random(0, width), random(0, height / 2)));
        timerTick = 0;
      }
    } else {
      timerTick++;
    }
    
    // limit the rate at which fireworks get launched when mouse is down
    if (limiterTick >= limiterTotal) {
      if (mousedown) {
        // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
        fireworks.push(new Firework(width / 2, height, mx, my));
        limiterTick = 0;
      }
    } else {
      limiterTick++;
    }
  };

  const onPointerMove = e => {
    mx = e.pageX;
    my = e.pageY;
  };

  const onPointerDown = e => {
    e.preventDefault();
    mousedown = true;
  };

  const onPointerUp = e => {
    e.preventDefault();
    mousedown = false;
  };

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointerup', onPointerUp);

  return {
    render,
    resize(w, h) {
      width = w;
      height = h;
    },
    destroy() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
    },
  };
};