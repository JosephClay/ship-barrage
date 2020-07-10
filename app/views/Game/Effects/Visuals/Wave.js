/* eslint-disable id-length */
const MAX_RADIUS = 60;
const DELAY_MOD = 18;
const EXPANSION_RATE = 0.5;
const ALPHA = 0.6;

export default class Wave {
  constructor(system, index, x, y) {
    this.system = system;
    this.x = x;
    this.y = y;
    this.r = 5;
    this.delay = index * DELAY_MOD;
    this.opacity = 0;
  }
  
  update() {
    if (this.delay) {
      this.delay -= 1;
      return;
    }

    this.r += EXPANSION_RATE;
    this.opacity = Math.max(1 - this.r / MAX_RADIUS, 0);
    
    if (this.r >= MAX_RADIUS) this.system.remove(this);
  }

  render(ctx) {
    if (this.delay !== 0) return;

    ctx.save();

    ctx.globalAlpha = ALPHA;

    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = this.r / 5;
    ctx.shadowColor = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  } 
}