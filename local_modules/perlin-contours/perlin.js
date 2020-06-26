// reimplementation of p5 perlin noise generation
// https://github.com/processing/p5.js/blob/master/src/math/noise.js

const {
  PI,
  floor,
  cos,
} = Math;

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

// default to medium smooth
const PERLIN_OCTAVES = 4;
// 50% reduction/octave
const PERLIN_AMP_FALLOFF = 0.5;

// Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
// MAX is basically chosen to be large (as it is the max period)
// and for its relationships to MAX and CO
const MAX = 4294967296;
// MUL - 1 should be divisible by MAX's prime factors
const MUL = 1664525;
// CO and MUL should be co-prime
const CO = 1013904223;

// Linear Congruential Generator
// Variant of a Lehman Generator
const linearCongruentialGenerator = val => {  
  // the >>> 0 casts the seed to an unsigned 32-bit integer
  let seed = val >>> 0;

  return () => {
    // define the recurrence relationship
    seed = (MUL * seed + CO) % MAX;
    // return a float in [0, 1)
    // if seed = MAX then seed / MAX = 0 therefore (seed % MAX) / MAX < 1 always
    return seed / MAX;
  };
};

const scaledCosine = idx => 0.5 * (1.0 - cos(idx * PI));

export default function perlin() {
  const perlin = new Array(PERLIN_SIZE + 1);
  
  return {
    noise(x, y = 0, z = 0) {
      // eslint-disable-next-line no-param-reassign
      if (x < 0) x = -x;
      // eslint-disable-next-line no-param-reassign
      if (y < 0) y = -y;
      // eslint-disable-next-line no-param-reassign
      if (z < 0) z = -z;

      let xi = floor(x);
      let yi = floor(y);
      let zi = floor(z);
      let xf = x - xi;
      let yf = y - yi;
      let zf = z - zi;
      let rxf;
      let ryf;

      let r = 0;
      let ampl = 0.5;

      let n1;
      let n2;
      let n3;

      for (let idx = 0; idx < PERLIN_OCTAVES; idx++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

        rxf = scaledCosine(xf);
        ryf = scaledCosine(yf);

        n1 = perlin[of & PERLIN_SIZE];
        n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
        n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
        n1 += ryf * (n2 - n1);

        of += PERLIN_ZWRAP;
        n2 = perlin[of & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
        n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
        n2 += ryf * (n3 - n2);

        n1 += scaledCosine(zf) * (n2 - n1);

        r += n1 * ampl;
        ampl *= PERLIN_AMP_FALLOFF;
        xi <<= 1;
        xf *= 2;
        yi <<= 1;
        yf *= 2;
        zi <<= 1;
        zf *= 2;

        if (xf >= 1.0) {
          xi++;
          xf--;
        }
        if (yf >= 1.0) {
          yi++;
          yf--;
        }
        if (zf >= 1.0) {
          zi++;
          zf--;
        }
      }
      return r;
    },
    seed(value) {
      const lcg = linearCongruentialGenerator(value);
      for (let idx = 0; idx < PERLIN_SIZE + 1; idx++) {
        perlin[idx] = lcg();
      }
    },
  };
};