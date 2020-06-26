import Particle from './Particle';
import distance from 'utils/distance';
import random from 'utils/random';

const {
  atan2,
  cos,
  sin,
  PI,
} = Math;

// create particle group/explosion
const createParticles = (particles, x, y, hue) => {
  // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
  let particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y, hue));
  }
};

// create firework
export default class Firework {
  constructor(sx, sy, tx, ty) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = distance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    const coordinates = this.coordinates = [];
    let coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    while (coordinateCount--) {
      coordinates.push([sx, sy]);
    }
    this.angle = atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);
    // circle target indicator radius
    this.targetRadius = 1;
  }

  // update firework
  update(index, particles, fireworks, hue) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
  
    // cycle the circle target indicator radius
    this.targetRadius = this.targetRadius < 8 ?
      this.targetRadius + 0.3 :
      1;
  
    // speed up the firework
    this.speed *= this.acceleration;
  
    // get the current velocities based on angle and speed
    const vx = cos(this.angle) * this.speed;
    const vy = sin(this.angle) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = distance(this.sx, this.sy, this.x + vx, this.y + vy);
  
    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(particles, this.tx, this.ty, hue);
      // remove the firework, use the index passed into the update function to determine which to remove
      fireworks.splice(index, 1);
    } else {
      // target not reached, keep traveling
      this.x += vx;
      this.y += vy;
    }

    return this;
  };

  // draw firework
  draw(ctx, hue) {
    const { coordinates } = this;
    ctx.beginPath();
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    ctx.moveTo(coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
    ctx.stroke();
  
    ctx.beginPath();
    // draw the target for this firework with a pulsing circle
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, PI * 2);
    ctx.stroke();

    return this;
  }
};