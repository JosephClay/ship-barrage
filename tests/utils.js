import battleship from '../battleship';
import {
  VERTICAL,
  HORIZONTAL,
} from 'settings';

const piecePlacement = [
  {
    type: 'patrol',
    orientation: VERTICAL,
    coords: [0, 0],
  },
  {
    type: 'submarine',
    orientation: VERTICAL,
    coords: [0, 2],
  },
  {
    type: 'destroyer',
    orientation: VERTICAL,
    coords: [0, 5],
  },
  {
    type: 'carrier',
    orientation: HORIZONTAL,
    coords: [0, 8],
  },
  {
    type: 'battleship',
    orientation: HORIZONTAL,
    coords: [0, 9],
  },
];

const attackCoords = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 8],
  [0, 9],
  [1, 9],
  [2, 9],
  [3, 9],
];

const setupPreReadyGame = () => {
  const game = battleship(battleship.create());

  game.addPlayer({ playerId: '1' });
  piecePlacement.forEach(data => (
    game.placePiece({ playerId: '1', ...data })
  ));

  game.addPlayer({ playerId: '2' });
  piecePlacement.forEach(data => (
    game.placePiece({ playerId: '2', ...data })
  ));

  return game;
};

const setupReadyGame = () => {
  const game = setupPreReadyGame();

  game.setPlayerReady('1');
  game.setPlayerReady('2');

  game.start();

  return game;
};

const setupPlayedGame = () => {
  const game = setupReadyGame();

  try {
    attackCoords.forEach(coords => {
      game.attack({ playerId: '1', coords });
      game.attack({ playerId: '2', coords });
    });
  // NOTE: we expect this to fail on the final attack
  // as the game is over with player 1 defeating player 2
  } catch {}

  return game;
};

export {
  piecePlacement,
  setupPreReadyGame,
  setupReadyGame,
  setupPlayedGame,
};

export const delay = (ms = 0) => (
  new Promise(resolve => setTimeout(resolve, ms))
);