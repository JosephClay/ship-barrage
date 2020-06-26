import React, { useRef, useEffect } from 'react';
import Fire from './Fire';
import style from './fireworks.style';
import useScreen from '../../hooks/useScreen';

export default function Fireworks() {
  const canvas = useRef();
  const snow = useRef();
  const { width, height } = useScreen();

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');
    const instance = snow.current = Fire(width, height);

    let raf;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      instance.render(ctx);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
    };
  }, [canvas.current]);

  useEffect(() => {
    if (!snow.current) return;
    
    canvas.current.width = width;
    canvas.current.height = height;

    snow.current.resize(width, height);
  }, [snow.current, width, height]);

  return (
    <canvas
      ref={ canvas }
      css={ style }
      width={ width }
      height={ height }
    />
  );
};