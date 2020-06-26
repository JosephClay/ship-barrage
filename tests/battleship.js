import test from 'blue-tape';
import battleship from '../battleship';
import key from '../battleship/key';
import {
  HORIZONTAL,
  STATE_END,
  STATE_SETUP,
  STATE_ACTIVE,
  STATE_READY,
} from 'settings';
import isString from 'utils/isString';
import isNumber from 'utils/isNumber';
import isFunction from 'utils/isFunction';
import {
  piecePlacement,
  setupPreReadyGame,
  setupReadyGame,
  setupPlayedGame,
} from './utils';

test('create', assert => {
  assert.doesNotThrow(() => battleship.create());
  
  const game = battleship.create();
  assert.ok(isString(game.id), 'id is defined');
  assert.is(game.id.length, 5, 'id is 5 characters');
  assert.ok(isNumber(game.time), 'time is defined');
  assert.same(game.players, {}, 'starts without players');
  assert.is(game.state, STATE_SETUP, 'starts in setup mode');
  
  const inst = battleship(game);
  inst.addPlayer({ playerId: '1', playerName: '1' });
  assert.is(inst.turn(), '1', 'player 1 starts');

  assert.end();
});

test('load', assert => {
  assert.doesNotThrow(() => battleship(battleship.create()));

  const game = battleship(battleship.create());
  assert.ok(isFunction(game.state));

  assert.end();
});

test('players', assert => {
  const game = battleship(battleship.create());

  assert.throws(() => game.addPlayer(), 'object is requires');
  assert.throws(() => game.addPlayer({}), 'id is required');
  assert.throws(() => game.getPlayer({ playerId: '1' }), /missing player/, 'cannot get player 1 before adding');
  assert.throws(() => game.getOpponent({ playerId: '1' }), /missing player/, 'cannot get player 2 before adding');
  
  const player = game.addPlayer({ playerId: '1' });
  assert.ok(player, 'adding a player returns a player');
  assert.is(player.id, '1', 'player id added');
  assert.is(game.getPlayer('1').id, '1', 'can get player 1 after adding');

  assert.is(game.hasAvailability(), true, 'another player spot is available');

  assert.throws(() => game.addPlayer({ playerId: '1' }), 'cannot re-add the same player');
  assert.is(game.getOpponent('1'), undefined, 'no opponent exists');

  const opponent = game.addPlayer({ playerId: '2' });
  assert.ok(opponent, 'adding another player returns a player');
  assert.is(opponent.id, '2', 'opponent id added');
  assert.is(game.getPlayer('2').id, '2', 'can get player 2 after adding');

  assert.is(game.hasAvailability(), false, 'another player spot is not available');

  assert.throws(() => game.addPlayer({ playerId: '3' }), 'cannot add more than 2 players');
  assert.is(game.getOpponent('1').id, '2', 'opponent of player 1 is player 2');

  assert.end();
});

test('pieces', assert => {
  const game = battleship(battleship.create());
  game.addPlayer({ playerId: '1' });

  // pieces aren't placed
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'patrol'
  }), false, 'patrol not placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'submarine'
  }), false, 'submarine not placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'destroyer'
  }), false, 'destroyer not placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'carrier'
  }), false, 'carrier not placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'battleship'
  }), false, 'battleship not placed');

  piecePlacement.forEach(({ type, orientation, coords }) => {
    assert.is(game.placePiece({
      playerId: '1',
      type,
      orientation,
      coords,
    }), true, `placed ${type}`);
  });

  // pieces are placed
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'patrol'
  }), true, 'patrol placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'submarine'
  }), true, 'submarine placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'destroyer'
  }), true, 'destroyer placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'carrier'
  }), true, 'carrier placed');
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'battleship'
  }), true, 'battleship placed');

  assert.is(game.unplacePiece({
    playerId: '1',
    type: 'battleship',
  }), true);
  
  assert.is(game.isPiecePlaced({
    playerId: '1',
    type: 'battleship',
  }), false, 'battleship unplaced');

  // replace the battleship
  const battleshipPiece = piecePlacement.find(({ type }) => type === 'battleship');
  game.placePiece({ playerId: '1', ...battleshipPiece, });

  // place the patrol piece colliding
  const patrolPiece = piecePlacement.find(({ type }) => type === 'patrol');
  assert.is(game.placePiece({
    playerId: '1',
    ...patrolPiece,
    orientation: HORIZONTAL,
    coords: [0, 8],
  }), false, 'cannot place colliding piece');

  // place the piece
  assert.is(game.placePiece({ playerId: '1', ...patrolPiece, }), true);
  // then move it over
  assert.is(game.placePiece({
    playerId: '1',
    ...patrolPiece,
    orientation: HORIZONTAL,
  }), true, 'can move/rotate a piece');

  assert.end();
});

test('ready', assert => {
  const game = setupPreReadyGame();
  
  assert.not(game.state(), STATE_READY, 'game not ready with no players ready');

  assert.is(game.setPlayerReady('1'), true, 'can set player to ready');
  assert.is(game.setPlayerReady('1'), true, 'can set player to ready multiple times');
  assert.throws(() => game.setPlayerReady('3'), /missing player/);
  assert.throws(() => game.unplacePiece({ playerId: '1', type: 'patrol' }), /cannot unplace a piece once ready/);

  assert.not(game.state(), STATE_READY, 'game not ready with 1 player ready');
  
  assert.is(game.setPlayerReady('2'), true, 'can set opponent to ready');

  assert.is(game.state(), STATE_READY, 'game ready when both players are ready');
  
  assert.is(game.start(), true, 'can start game');
  assert.is(game.state(), STATE_ACTIVE, 'game is active');

  assert.end();
});

test('attack', assert => {
  const game = setupReadyGame();

  assert.is(game.turn(), '1', 'player 1 turn');

  const hit = game.attack({
    playerId: '1',
    coords: [0, 0],
  });
  assert.is(hit, 1, 'attack is a hit');
  assert.is(game.getPlayer('1').hits, 1, 'tracked player hit');
  assert.is(game.getPlayer('1').screen[key(0, 0)], 1, 'player 1 screen shows hit');
  assert.is(game.getPlayer('2').map[key(0, 0)], 1, 'player 2 map shows hit');
  
  assert.is(game.turn(), '2', 'player 2 turn');

  const miss = game.attack({
    playerId: '2',
    coords: [1, 0],
  });
  assert.is(miss, -1, 'attack is a miss');
  assert.is(game.getPlayer('2').screen[key(1, 0)], -1, 'player 2 screen shows miss');
  assert.is(game.getPlayer('1').map[key(1, 0)], -1, 'player 1 map shows miss');

  assert.is(game.turn(), '1', 'player 1 turn');

  assert.is(game.attack({ playerId: '2', coords: [0, 0] }), 0, 'cannot attack out-of-turn');
  assert.is(game.attack({ playerId: '1', coords: [-1, 0] }), 0, 'cannot attack out-of-bounds');
  assert.is(game.attack({ playerId: '1', coords: [0, 0] }), 0, 'cannot attack already attacked coord');

  assert.end();
});

test('format', assert => {
  const game = setupReadyGame();

  assert.doesNotThrow(() => game.format('1'), 'can format for a player');
  assert.throws(() => game.format('3'), /missing player/);
  
  const data = game.format('1');
  assert.is(data.id, game.id(), 'formatted for correct game');
  assert.is(data.state, STATE_ACTIVE, 'game is in correct state');
  assert.is(data.playerId, '1', 'formatted for correct player');
  assert.is(data.opponent, undefined, 'opponent is non-existant');

  assert.end();
});

test('end', assert => {
  const game = setupPlayedGame();

  assert.is(game.state(), STATE_END, 'game end');
  assert.is(game.format('1').state, STATE_END, 'game end');
  assert.is(game.attack({ playerId: '1', coords: [1, 1] }), 0, 'player 1: cannot attack in a done game');
  assert.is(game.attack({ playerId: '2', coords: [1, 1] }), 0, 'player 2: cannot attack in a done game');

  assert.end();
});
