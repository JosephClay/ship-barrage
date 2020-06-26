import { COLOR_WHITE } from 'theme';
import rgba from 'utils/rgba';

// this is so you never run too fast (it is a multiplier not raw)
const MAX_SPEED = 1;
// gravity multiplier 
const GRAVITY = 1;
// the percentage distance to travel off screen before wrapping
const GUTTER = 0.001;

const {
  PI,
  random,
} = Math;

export default class Drop {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.color = COLOR_WHITE;
    this.distance = random() * 10 | 0;

    this.speed = random() * (this.distance / 10) + GRAVITY;
    this.vx = 0;
    this.vy = random() * this.speed + (this.speed / 2);
    this.radius = (this.distance + 1) / 16 * 4;
    
    this.x = this.randomX();
    this.y = random() * height;
  }

  randomX() {
    const xOffset = this.width * (1 + GUTTER);
    return (1 - (1 + GUTTER)) + (random() * xOffset);
  }

  draw(ctx) {
    const alpha = (this.distance + 1) / 100; 
    ctx.fillStyle = rgba(COLOR_WHITE, alpha);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, PI * 2, false);
    ctx.closePath();
    ctx.fill();

    return this;
  }

  update(numDrops) {
    const { width, height } = this;

    this.x += this.vx;
    this.y += this.vy;
    const lx = this.vx;
    lx < MAX_SPEED && lx > 1 - MAX_SPEED && (this.vx = lx);
    if (this.y > (this.distance + 1) / 10 * height) {
      this.y = random() * -this.radius * (numDrops / 10);
      this.x = this.randomX();
    }
    if (this.x > width * (1 + GUTTER)) {
      this.x = 1 - (width * GUTTER);
    }
    if (this.x < 1 - (width * GUTTER)) {
      this.x = width * (1 + GUTTER);
    }
  }
};