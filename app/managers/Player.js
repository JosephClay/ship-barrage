import Storage from '../common/Storage';
import uniqueId from 'utils/uniqueId';
import {
  STATE_READY,
  STATE_SETUP,
} from 'settings';

const storage = Storage('ID');

const Player = function(store, socket) {
  return {
    ready() {
      store.set(['game', 'playerState'], STATE_READY);
      socket.send('player:ready', ({ success }) => {
        if (success) return;
        store.set(['game', 'playerState'], STATE_SETUP);
      });
    },
  };
};

Player.id = () => {
  let id = storage.get();
  if (id) return id;

  id = uniqueId();
  storage.set(id);
  return id;
};

export default Player;