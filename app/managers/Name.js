import isString from 'utils/isString';
import route from '../common/route';
import { isName } from '../../validation';
import Storage from '../common/Storage';
import { STATE_HOME, STATE_NAMING } from 'settings';

const storage = Storage('NAME');

const Name = function(state, store, socket) {
  socket.on('name:change', ({ id, name }) => {
    const currentGameId = store.get(['game', 'id']);
    if (currentGameId !== id) return;
    store.set(['game', 'opponentName'], name);
  });

  socket.on('name:change', ({ id, name }) => {
    const session = store.select(['sessions', { id }]);
    if (!session.exists()) return;
    session.set('opponentName', name);
  });

  return {
    cancel() {
      state.set(STATE_HOME);
      route.clear();
    },

    set(name) {
      // not a valid name
      if (!isName(name)) return;

      // this is a name change
      if (isName(store.get())) socket.emit('player:rename', { playerName: name });
      
      // update stores
      store.set(name);
      storage.set(name);
    },

    async request() {
      return new Promise(resolve => {
        state.set(STATE_NAMING);

        const onNameChange = () => {
          // eslint-disable-next-line no-use-before-define
          disposer();
          resolve();
        };

        const disposer = store.watch(onNameChange);        
      });
    },
  };
};

Name.get = () => {
  const value = storage.get();
  if (!isString(value) || !value.length) return '';
  return value;
};

export default Name;