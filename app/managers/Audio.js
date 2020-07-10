import { Howl, Howler } from 'howler';
import data from '../static/audio.json';
import Storage from '../common/Storage';

const { volumes } = data;
const storage = Storage('AUDIO');

const listenForInteraction = function() {
  return new Promise(function(resolve) {
    let handled = false;

    const { body } = global.document;
    const events = [
      'keydown',
      'mousedown',
      'pointerdown',
      'touchstart',
    ];

    const onInteraction = () => {
      if (handled) return;
      handled = true;

      events.forEach(eventName => {
        body.removeEventListener(eventName, onInteraction);
      });

      resolve();
    };

    events.forEach(eventName => {
      body.addEventListener(eventName, onInteraction);
    }); 
  });
};

const Audio = function(store) {
  const music = new Howl(data.music).volume(volumes.music);
  const effects = new Howl(data.effects);
  
  let isOn = store.get();
  
  Howler.mute(!isOn);

  store.watch(() => {
    isOn = store.get();
    storage.set(isOn);
    Howler.mute(!isOn);
  });

  const start = async function() {
    await listenForInteraction();
    music.play();
  };

  start();

  return {
    toggle() {
      store.set(!store.get());
    },
    play(key) {
      effects && effects.volume(volumes[key]).play(key);
    },
  };
};

Audio.get = () => !!storage.get();

export default Audio;