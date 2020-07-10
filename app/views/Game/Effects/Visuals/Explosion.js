import random from 'utils/random';
import randomInt from 'utils/randomInt';
import Crown from './Crown';
import Particle from './Particle';

export default class Explosion {
  constructor(world, x, y) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.objects = new Set();

    let particles = randomInt(30, 80);
    let crowns = ~~(particles * random(0.3, 0.5));

    while (crowns--) this.objects.add(new Crown(this, this.x, this.y));
    while (particles--) this.objects.add(new Particle(this, this.x, this.y));
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