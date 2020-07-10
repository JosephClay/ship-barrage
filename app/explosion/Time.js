export default class Time {  
  constructor() {
    this.now = 0; // current tick time
    this.prev = 0; // prev tick time
    this.elapsed = 0; // elapsed time from last tick
    this.delta = 0; // time from last update
    this.fps = 60; // desired fps
    this.step = 1 / 60; // step duration
  }
  
  update(time) {
    this.now = time;
    this.elapsed = (this.now - this.prev) / 1000;
    this.prev = this.now;
    this.delta += this.elapsed;
  }
  
  raf(func) {
    window.requestAnimationFrame(func);
  }
  
  hasFrames() {
    return this.delta >= this.step;
  }
  
  processFrame() {
    this.delta -= this.step;
  }
};