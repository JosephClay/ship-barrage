import Explosion from './Explosion';

export default class World {
  // TODO: need init or could this be a constructor?
  init() {        
    this.objects = [];
    // TODO: abstract to store
    window.addEventListener('click', this.explode.bind(this));
    
    // Initial explosion
    let counter = 3;
    while (counter-- > 0) {
      this.explode({
        // TODO: pass universe instead of external assignment
        clientX: this.universe.width / 2,
        clientY: this.universe.height / 2
      }); 
    }
  }
  
  update(dt) {
    // TODO: optimize
    this.objects.forEach(obj => {
      if (obj) obj.update(dt);
    });

    // TODO: remove?
    const amount = this.objects.reduce((sum, explosion) => {
      return sum + explosion.objects.length;
    }, 0);
    console.log(amount);
  }
  
  render(ctx) {
    this.objects.forEach(obj => {
      if (obj) obj.render(ctx);
    });
  }
  
  explode(event) {
    const x = event.clientX;
    const y = event.clientY;

    this.objects.push(new Explosion(this, x, y));
  }
  
  clearExplosion(explosion) {
    const index = this.objects.indexOf(explosion);
    
    if (index !== -1) {
      this.objects.splice(index, 1);
    }
  } 
};