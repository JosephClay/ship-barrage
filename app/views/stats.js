import Stats from 'stats.js';

const active = process.env.NODE_ENV === 'development';

export default function() {
  if (!active) return;

  const stats = new Stats();

  // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.showPanel(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.zIndex = 9999;
  stats.domElement.style.top = 0;
  stats.domElement.style.right = 0;
  stats.domElement.style.width = '80px';
  document.body.appendChild(stats.domElement);

  const loop = () => {
    stats.update();
    requestAnimationFrame(loop);
  };

  loop();
};