import { useRef, useState, useEffect } from 'react';
import lerp from 'utils/lerp';
import usePointer from './usePointer';

const areClose = (left, right) => {
  return Math.abs(left) - Math.abs(right) < 0.001;
};

export default function useParallax(maxX = 1, maxY = maxX, animate = 0.05) {
  const {
    percX: x,
    percY: y,
  } = usePointer();

  const saved = useRef({
    x: maxX * x,
    y: maxY * y,
  });

  const [state, setState] = useState(saved);

  useEffect(() => {
    let raf;

    saved.current.x = maxX * x;
    saved.current.y = maxY * y;

    const loop = () => {
      const newX = animate ? lerp(saved.current.x, maxX * x, animate) : maxX * x;
      const newY = animate ? lerp(saved.current.y, maxY * y, animate) : maxY * y;

      // stop
      if (areClose(newX, x) && areClose(newY, y)) {
        return setState({ x: newX, y: newY });
      }

      saved.current.x = newX;
      saved.current.y = newY;
      setState({
        x: newX,
        y: newY,
      });
    };

    loop();
    
    return () => cancelAnimationFrame(raf);
  }, [x, y]);


  return state;
};