import random from 'utils/random';
import randomInt from './randomInt';
import Crown from './Crown';
import Particle from './Particle';

export default class Explosion {
  constructor(world, x, y) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.objects = [];

    let particles = randomInt(30, 80); // 10, 30 amount of particles
    let crowns = particles * random(0.3, 0.5);

    while (crowns-- > 0) this.objects.push(new Crown(this, this.x, this.y));
    while (particles-- > 0) this.objects.push(new Particle(this, this.x, this.y));
  }
  
  update(dt) {
    this.objects.forEach(obj => {
      if (obj) obj.update(dt);
    });
    
    if (this.objects.length <= 0) {
      this.world.clearExplosion(this);
    }
  }
  
  render(ctx) {
    this.objects.forEach(obj => {
      if (obj) obj.render(ctx);
    });
  }
  
  removeObject(obj) {
    const index = this.objects.indexOf(obj);
    
    if (index !== -1) {
      this.objects.splice(index, 1);
    }
  }
};