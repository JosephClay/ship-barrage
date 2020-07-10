import Explosion from './Explosion';
import Splash from './Splash';

export default function Visuals(width, height) {
  const objects = new Set();  

  return {
    width, 
    height,

    resize(width, height) {
      this.width = width;
      this.height = height;
    },

    explode([x, y]) {
      objects.add(new Explosion(this, x, y));
    },
    
    splash([x, y]) {
      objects.add(new Splash(this, x, y));
    },
  
    tick(ctx) {
      for (const obj of objects.values()) {
        obj.update();
        obj.render(ctx);
      }
    },

    remove(obj) {
      objects.has(obj) && objects.delete(obj);
    },

    destroy() {
      objects.clear();
    },
  };
};