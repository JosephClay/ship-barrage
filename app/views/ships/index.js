import Battleship from './Battleship';
import Carrier from './Carrier';
import Destroyer from './Destroyer';
import Patrol from './Patrol';
import Submarine from './Submarine';

export default new Map([
  ['battleship', Battleship],
  ['carrier', Carrier],
  ['destroyer', Destroyer],
  ['patrol', Patrol],
  ['submarine', Submarine],
]);