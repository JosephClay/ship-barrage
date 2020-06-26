import Battleship from './Battleship';
import uniqueId from 'utils/uniqueId';
import { STATE_SETUP } from 'settings';

const battleship = function(game) {
  return new Battleship(game);
};

battleship.create = () => ({
  id: uniqueId(5),
  time: Date.now(),
  state: STATE_SETUP,
  players: {},
  turn: '',
});

battleship.clone = ({ game: { players } }) => {
  const game = battleship(battleship.create());
  Object.entries(players).forEach(([id, { name }]) => {
    game.addPlayer({ playerId: id, playerName: name });
  });
  return game;
};

export default battleship;