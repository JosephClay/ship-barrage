import test from 'blue-tape';
import store from '../server/store';
import service from '../server/service';
import { delay } from './utils';

const connect = service.connect();

test('create', async function(assert) {
  await connect;
  
  const game = store.create();
  await delay(100);

  const [foundGame] = await service.all();

  assert.is(foundGame.id, game.id(), 'saved created game');

  await store.remove(game.id());

  const savedGames = await service.all();

  assert.is(savedGames.length, 0, 'deleted game');
});

test('clean', async function(assert) {
  await connect;
  
  store.create();
  await delay(100);

  // clean using a future date to remove the game we just created
  await store.clean(Date.now() + 10000);

  const noGames = await service.all();
  assert.is(noGames.length, 0, 'successfully cleaned the game');

  store.create();
  await delay(100);

  // clean using a past date to skip the game we just created
  await store.clean(Date.now() - 10000);

  const oneGame = await service.all();
  assert.is(oneGame.length, 1, 'successfully skipped the game');
});
