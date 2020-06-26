import battleship from '../battleship';
import service from './service';

const games = new Map();
const ONE_DAY = 24 * 60 * 60 * 1000;

export default {
  async prime() {
    const list = await service.all();
    for (const { id, game } of list) {
      games.set(id, battleship(game));
    }
    await this.clean();
  },

  create() {
    const game = battleship(battleship.create());
    games.set(game.id(), game);
    service.save(game);
    return game;
  },

  clone(existingGame) {
    const game = battleship.clone(existingGame);
    games.set(game.id(), game);
    service.save(game);
    return game;
  },

  exists(id) {
    return games.has(id);
  },

  get(id) {
    return games.get(id);
  },

  sessionSize(playerId) {
    let count = 0;
    for (const game of games.values()) {
      if (game.hasPlayer(playerId)) count++;
    }
    return count;
  },

  getSessions(playerId) {
    return Array.from(games.values())
      .filter(game => game.hasPlayer(playerId));
  },

  remove(id) {
    games.delete(id);
    return service.remove(id);
  },

  save(game) {
    return service.save(game);
  },

  async clean(minTime = Date.now() - ONE_DAY) {
    const ids = await service.findAllOlderThan(minTime);
    ids.forEach(id => games.delete(id));
    await service.clean(ids);
  },
};