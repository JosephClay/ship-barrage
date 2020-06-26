// simple wrapper around seedrandom

import seedrandom from 'seedrandom';

export default seed => {
  const rand = seedrandom(seed);
  return (min = 1) => rand() * min;
};
