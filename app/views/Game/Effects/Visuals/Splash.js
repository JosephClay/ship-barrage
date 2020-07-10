import Wave from './Wave';

const WAVE_QTY = 5;

export default class Splash {
  constructor(world, x, y) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.objects = new Set();

    let idx = WAVE_QTY;
    while (idx--) {
      this.objects.add(new Wave(this, idx, this.x, this.y));
    }
  }
  
  update() {
    for (const obj of this.objects.values()) {
      obj.update();
    }
    
    if (!this.objects.size) this.world.remove(this);
  }
  
  render(ctx) {
    for (const obj of this.objects.values()) {
      obj.render(ctx);
    }
  }
  
  remove(obj) {
    this.objects.has(obj) && this.objects.delete(obj);
  }
};