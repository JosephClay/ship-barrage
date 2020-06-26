import debounce from 'utils/debounce';

const measure = () => ({
  width: global.innerWidth,
  height: global.innerHeight,
});

const Screen = function(store) {
  const resize = debounce(() => store.set(measure()));

  resize();

  global.addEventListener('resize', resize);
};

Screen.get = measure;

export default Screen;