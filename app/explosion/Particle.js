/* eslint-disable id-length */
import random from 'utils/random';
import randomInt from './randomInt';
import sample from './sample';

// TODO: kill colors of black and white impl
const colors = [
  'rgba(231, 76, 60, 1)', // red
  'rgba(241, 196, 15, 1)', // yellow
  'rgba(231, 76, 60, 1)', // red
  'rgba(241, 196, 15, 1)', // yellow
  'rgba(231, 76, 60, 1)' // red
];

const randomColor = () => sample(colors);

// Particle

export default class Particle {
  constructor(system, x, y) {
    this.system = system;
    this.universe = this.system.world.universe;
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.life = 1;
    this.aging = random(0.99, 0.999); // 0.99, 0.999 || 0.999, 0.9999
    
    this.r = randomInt(5, 12);
    this.speed = random(1, 2);
    this.velocity = [
      random(-this.speed, this.speed),
      random(-this.speed, this.speed),
    ];
  }
  
  update() {
    this.life *= this.aging;
    
    if (
      // too small
      this.r < 0.1
      // end of life check
      || this.life === 0
      // out of bounds check
      || this.x + this.r < 0
      || this.x - this.r > this.universe.width
      || this.y + this.r < 0
      || this.y - this.r > this.universe.height
    ) {
      return this.system.removeObject(this);
    }
    
    this.r *= this.life;
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }
  
  render(ctx) {
    // main circle
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();

    // TODO: kill this
    const r = this.color.match(/([0-9]+)/g)[0];
    const g = this.color.match(/([0-9]+)/g)[1];
    const b = this.color.match(/([0-9]+)/g)[2];

    // Gradient
    
    const spread = 1.5;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.r,
      this.x, this.y, this.r * spread
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * spread, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
    
    // Aberration
    
    const offset = this.r * 0.5;
    const color = `rgba(${g}, ${b}, ${r}, 0.3)`;
    
    // ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x + offset, this.y + offset, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    // TODO: save and restore and remove source-over
    ctx.globalCompositeOperation = 'source-over';
    // ctx.restore();
  }
};