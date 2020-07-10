/* eslint-disable id-length */
import random from 'utils/random';
import randomInt from 'utils/randomInt';
import sample from 'utils/sample';

// NOTE: duplications are to weight the sample
const colors = [
  [255, 255, 255], // white
  [252, 251, 159], // pale yellow
  [252, 251, 159], // pale yellow
  [237, 173, 69], // light orange
  [237, 173, 69], // light orange
  [110, 20, 12], // deep red
  [110, 20, 12], // deep red
  [110, 20, 12], // deep red
];

export default class Particle {
  constructor(system, x, y) {
    this.system = system;
    this.world = this.system.world;
    this.x = x;
    this.y = y;
    this.color = sample(colors);
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
      || this.x - this.r > this.world.width
      || this.y + this.r < 0
      || this.y - this.r > this.world.height
    ) {
      return this.system.remove(this);
    }
    
    this.r *= this.life;
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }
  
  render(ctx) {
    // main circle
    
    ctx.save();
    ctx.fillStyle = `rgb(${this.color.join(',')})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    const [r, g, b] = this.color;

    // Gradient
    
    const spread = 1.5;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.r,
      this.x, this.y, this.r * spread
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * spread, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    
    // Aberration
    
    const offset = this.r * 0.5;
    const color = `rgba(${g}, ${b}, ${r}, 0.3)`;
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x + offset, this.y + offset, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
};