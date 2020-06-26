// adapation of:
// http://thingonitsown.blogspot.com/2019/02/finding-perlin-contours.html
import * as Comlink from 'comlink';
import distance from './distance';
import perlin from './perlin';
import seedrandom from './seedrandom';

const PL = 2;
const MIN_VERTICIES = 10;
const {
  PI,
  cos,
  sin,
  abs,
} = Math;
const SIZE = 2000;

// prevents straight lines from appearing
const isValidContour = vertices => {
  const first = vertices[0];
  const last = vertices[vertices.length - 1];
  const dist = distance(first[0], first[1], last[0], last[1]);
  return dist < 1000;
};

const generate = function(seed) {
  const random = seedrandom(seed);

  const {
    noise,
    seed: seedNoise,
  } = perlin();

  let ix = 0;
  let iy = 0;
  let mx = 0;
  let my = 0;
  let border = 0.1;

  const rca = [];

  const nn = () => {
    return abs(noise(ix / 350, iy / 350) - border) < 0.0035;
  };

  const generateVerticies = (nx, ny) => {
    const verticies = [];

    ix = nx;
    iy = ny;
    border = noise(ix / 350, iy / 350);

    let d = 0;
    const sx = ix;
    const sy = iy;
    for (let idx = 0; idx < 50000; idx++) {
      const od = d;
      const ox = ix;
      const oy = iy;

      for (d = od + PI / 2; (d > od - PI / 2 && !nn()) || d === od + PI / 2; d -= 0.17) {
        ix = ox + PL * cos(d);
        iy = oy - PL * sin(d);
      }

      verticies.push([
        ix - mx + SIZE / 2,
        iy - my + SIZE / 2,
      ]);

      if (distance(ix, iy, sx, sy) < PL && idx > 1) {
        if (idx > 4) break;
      }
    }

    return verticies;
  };

  const generateContour = function(nx, ny) {
    const verticies = generateVerticies(nx, ny);
    if (verticies.length <= MIN_VERTICIES || !isValidContour(verticies)) return;
    return verticies;
  };

  const setup = () => {
    seedNoise(random(1000));
    
    mx = 0;
    my = 0;
    let mh = 0;
    for (let idx = 0; idx < 10000; idx++) {
      const nx = random(10000);
      const ny = random(10000);
      const nh = noise(nx / 350, ny / 350);
      if (nh > mh) {
        mx = nx;
        my = ny;
        mh = nh;
      }
    }
    
    const interations = 30;
    const nx = mx;
    let ny = my;
    let nh = mh;
    for (let nc = 0; nc < interations; nc++) {
      while (noise(nx / 350, ny / 350) > nh - 0.01) ny++;
      nh = noise(nx / 350, ny / 350);
      rca.push(nx, ny);
    }
  };

  const render = () => {
    const result = [];
    for (let idx = rca.length - 2; idx >= 0; idx -= 2) {
      const contour = generateContour(rca[idx], rca[idx + 1]);
      if (contour) result.push(contour);
    }
    return result;
  };

  setup();
  return render();
};

Comlink.expose(generate);