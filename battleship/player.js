import { map } from './ships';
import { STATE_SETUP } from 'settings';

export default (id, name = '') => ({
  id,
  name,
  board: {},
  screen: {},
  map: {},
  hits: 0,
  state: STATE_SETUP,
  ships: map(),
});