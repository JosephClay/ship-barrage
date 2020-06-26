import key from './key';
import boardCollisionCheck from './boardCollisionCheck';
import coordsOutOfBounds from './coordsOutOfBounds';
import createPlayer from './player';
import {
  STATE_SETUP,
  STATE_READY,
  STATE_ACTIVE,
  STATE_END,
  
  VERTICAL,
  HORIZONTAL,

  HIT,
  MISS,

  MAX_HITS,
} from 'settings';

export default class Battleship {
  constructor(game) {
    this.game = game;
  }

  // players

  hasAvailability() {
    return Object.keys(this.game.players).length < 2;
  }

  addPlayer({ playerId, playerName }) {
    const { game } = this;
    if (!playerId) throw new Error(`playerId is required: ${playerId}`);
    if (game.players[playerId]) throw new Error(`player already added: ${playerId}`);
    if (!this.hasAvailability()) throw new Error(`game is full`);

    const player = createPlayer(playerId, playerName);

    // add the player to the game
    game.players[playerId] = player;

    // set the turn
    if (!game.turn) game.turn = playerId;

    // give back the player created
    return player;
  }

  hasPlayer(playerId) {
    const { game: { players } } = this;
    const player = players[playerId];
    return !!player;
  }

  getPlayer(playerId) {
    const { game: { players } } = this;
    const player = players[playerId];
    if (!player) throw new Error(`missing player: ${playerId}`);
    return player;
  }

  getOpponent(playerId) {
    const player = this.getPlayer(playerId);
    const { game: { players } } = this;
    for (const key in players) {
      if (key !== player.id) return players[key];
    }
  }

  getOpponentName(playerId) {
    return !this.hasAvailability() ? this.getOpponent(playerId).name : '';
  }

  updatePlayerName({ playerId, playerName }) {
    this.getPlayer(playerId).name = playerName;
  }

  // setup

  isPiecePlaced({ playerId, type }) {
    return this.getPlayer(playerId).ships[type].placed;
  }

  placePiece({ playerId, type, orientation, coords }) {
    const { game } = this;
    const player = this.getPlayer(playerId);
    if (player.state !== STATE_SETUP) throw new Error(`cannot place a piece once ready`);
    if (game.state !== STATE_SETUP) throw new Error(`invalid game state`);

    const { ships, board } = player;
    const ship = ships[type];

    // if the ship is placed, unplace it
    if (ship.placed) this.unplacePiece({ playerId, type });

    // check if starting position is out-of-bounds
    if (coordsOutOfBounds(coords)) return false;

    // check if ending position is out-of-bounds
    const { length } = ship;
    const isEndingOutOfBounds = coordsOutOfBounds([
      orientation === HORIZONTAL ? coords[0] + length - 1 : coords[0],
      orientation === VERTICAL ? coords[1] + length - 1 : coords[1],
    ]);
    if (isEndingOutOfBounds) return false;

    // check if it collides with other pieces
    const collision = boardCollisionCheck(board, ship.length, orientation, coords);
    if (collision) return false;
    
    // place piece
    ship.placed = true;
    ship.orientation = orientation;
    ship.coords = coords;

    // reflect on board
    for (let idx = 0; idx < length; idx++) {
      const x = orientation === HORIZONTAL ? coords[0] + idx : coords[0];
      const y = orientation === VERTICAL ? coords[1] + idx : coords[1];
      board[key(x, y)] = 1;
    }

    // success
    return true;
  }

  unplacePiece({ playerId, type }) {
    const player = this.getPlayer(playerId);
    if (player.state !== STATE_SETUP) throw new Error(`cannot unplace a piece once ready`);

    const ship = player.ships[type];
    // ship isn't placed
    if (!ship.placed) return false;
    
    const { board } = player;

    // reflect on board
    const { length, orientation, coords } = ship;
    for (let idx = 0; idx < length; idx++) {
      const x = orientation === HORIZONTAL ? coords[0] + idx : coords[0];
      const y = orientation === VERTICAL ? coords[1] + idx : coords[1];
      delete board[key(x, y)];
    }

    // reset the coords
    ship.coords = [0, 0];

    // unplace
    ship.placed = false;

    return true;
  }

  // ready

  setPlayerReady(playerId) {
    const player = this.getPlayer(playerId);
    // player is already ready
    if (player.state === STATE_READY) return true;
    
    const unplacedShip = Object.values(player.ships).find(({ placed }) => !placed);
    if (unplacedShip) return false;

    player.state = STATE_READY;

    // can't change the game state yet
    if (this.hasAvailability()) return true;
    // check if the opponent is ready
    if (this.getOpponent(playerId).state === STATE_READY) {
      // the game is ready
      this.game.state = STATE_READY;
    }

    return true;
  }

  // start 

  start() {
    const { game } = this;
    if (game.state !== STATE_READY) return false;
    
    game.state = STATE_ACTIVE;

    return true;
  }

  // attacking

  attack({ playerId, coords: [x, y] }) {
    const { game } = this;
    const player = this.getPlayer(playerId);
    const opponent = this.getOpponent(playerId);

    // player not allowed to attack
    if (game.turn !== playerId) return 0;
    
    // cannot attack
    if (game.state !== STATE_ACTIVE) return 0;
    
    // check if out-of-bounds
    if (coordsOutOfBounds([x, y])) return 0;

    const { map, board } = opponent;
    const { screen } = player;

    // cannot attack already attacked coord
    if (screen[key(x, y)]) return 0;

    // check if hit
    const isHit = !!board[key(x, y)];

    // reflect on player screen
    screen[key(x, y)] = isHit ? HIT : MISS;

    // reflect on opponent's map
    map[key(x, y)] = isHit ? HIT : MISS;

    // track hits
    if (isHit) player.hits += 1;

    // check game end
    if (player.hits === MAX_HITS) {
      player.state = STATE_END;
      opponent.state = STATE_END;
      game.state = STATE_END;
    }

    // flip the turn to the opponent
    game.turn = opponent.id;

    return isHit ? HIT : MISS;
  }

  // expose 
  
  id() {
    return this.game.id;
  }

  turn() {
    return this.game.turn;
  }

  state() {
    return this.game.state;
  }
  
  time() {
    return this.game.time;
  }

  format(playerId) {
    const player = this.getPlayer(playerId);
    const opponentName = this.getOpponentName(playerId);
    const { game } = this;

    return {
      id: game.id,
      state: game.state,
      turn: game.turn,
      time: game.time,

      playerId: player.id,
      playerState: player.state,
      ships: player.ships,
      board: player.board,
      screen: player.screen,
      map: player.map,
      hits: player.hits,

      opponentName,
    };
  }

  toJSON() {
    return this.game;
  }
};