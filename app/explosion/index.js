import Time from './Time';
import World from './World';

class Universe {
  constructor(element) {
    this.el = element;
    this.ctx = this.el.getContext('2d');
    this.pixelRatio = global.devicePixelRatio;
    this.time = new Time();
    
    // TODO: shouldn't need a world archive
    this.worlds = {};
    this.world = null; // current state

    this.updateSize();
    // TODO: abstract out
    window.addEventListener('resize', this.updateSize.bind(this));
    
    // TODO: better
    this.addWorld('confetti', World);
    this.setWorld('confetti');
    
    // TODO: abstract raf
    this.start();
  }
  
  start() {
    this.time.raf(this.tick.bind(this));
  }
  
  tick(time) {
    this.time.update(time);

    if (this.time.hasFrames()) {
      this.update();
      this.time.processFrame();
    }
    
    this.render();
    this.time.raf(this.tick.bind(this));
  }
  
  update() {
    this.world.update(this.time.step);
  }
  
  render() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    gradient.addColorStop(0, '#34495e');
    gradient.addColorStop(1, '#2c3e50');
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.world.render(this.ctx);
  }
  
  // Helpers
  
  updateSize() {
    this.width = global.innerWidth;
    this.height = global.innerHeight;
    this.el.width = this.width * this.pixelRatio;
    this.el.height = this.height * this.pixelRatio;
    this.el.style.width = `${global.innerWidth}px`;
    this.el.style.height = `${global.innerHeight}px`;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }
  
  addWorld(worldName, World) {
    this.worlds[worldName] = new World();
    this.worlds[worldName].universe = this;
    this.worlds[worldName].init();
  }
  
  setWorld(worldName) {
    this.world = this.worlds[worldName];
  }
};

export default canvas => new Universe(canvas);