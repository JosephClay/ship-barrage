/* eslint-disable id-length */
import random from 'utils/random';
import randomInt from './randomInt';

export default class Crown {
  constructor(system, x, y) {
    this.system = system;
    this.x = x;
    this.y = y;
    this.r = randomInt(15, 20); // 5, 20
    this.mod = 1.1;
    this.life = 1;
    this.aging = random(0.83, 0.88);
    this.speed = random(4, 5);
    
    this.color = {
      r: randomInt(236, 242),
      g: randomInt(196, 241),
      b: randomInt(195, 242)
    };

    this.angle1 = Math.PI * random(0, 2);
    this.angle2 = this.angle1 + Math.PI * random(0.1, 0.5);
  }
  
  update() {
    this.life *= this.aging;
    
    if (this.life <= 0.0001) this.system.removeObject(this);
    
    this.r += Math.abs(1 - this.life) * this.speed;
    
    this.x1 = this.x + this.r * Math.cos(this.angle1);
    this.y1 = this.y + this.r * Math.sin(this.angle1);
    
    this.angle3 = this.angle1 + ((this.angle2 - this.angle1) / 2);
    this.x2 = this.x + this.r * this.mod * Math.cos(this.angle3);
    this.y2 = this.y + this.r * this.mod * Math.sin(this.angle3);
  }

  render(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.r * 0.9,
      this.x, this.y, this.r
    );
    gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`);
    gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life * 0.5})`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.angle1, this.angle2, false);
    ctx.quadraticCurveTo(this.x2, this.y2, this.x1, this.y1);
    ctx.fill();
    ctx.closePath();
  } 
}