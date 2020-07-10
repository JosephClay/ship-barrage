import React, { useRef, useEffect } from 'react';
import canvas from './effects.style';
import Visuals from './Visuals';
import signal from 'signal-js';
import useScreen from '../../hooks/useScreen';
import useBoardPlacement from '../../hooks/useBoardPlacement';

export default function Effects() {
  const ref = useRef();

  // store the screen for effect
  const screen = useRef();
  screen.current = useScreen();

  // store the board for effect
  const placement = useRef();
  placement.current = useBoardPlacement();

  useEffect(() => {
    let raf;
    let width = screen.current.width;
    let height = screen.current.height;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const visuals = Visuals(width, height);

    const normalizeCoordsToScreen = coords => {
      const { x, y, size } = placement.current;
      const cellSize = size / 10;
      const halfCellSize = cellSize / 2;

      const offsetX = Math.round((coords[0] * cellSize) - halfCellSize);
      const offsetY = Math.round((coords[1] * cellSize) - halfCellSize);

      return [
        x + offsetX,
        y + offsetY,
      ];
    };

    const loop = time => {
      raf = requestAnimationFrame(loop);

      if (width !== screen.current.width || height !== screen.current.height) {
        width = canvas.width = screen.current.width;
        height = canvas.height = screen.current.height;
        visuals.resize(width, height);
      }

      ctx.clearRect(0, 0, width, height);
      visuals.tick(ctx, time);
    };

    const onAttack = (isHit, coords) => {
      if (isHit) return visuals.explode(normalizeCoordsToScreen(coords));
      visuals.splash(normalizeCoordsToScreen(coords));
    };
    
    canvas.width = width;
    canvas.height = height;

    signal.on('effect:attack', onAttack);
    
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      signal.off('effect:attack', onAttack);
      visuals.destroy();
    };
  }, []);

  return (
    <canvas
      css={ canvas }
      ref={ ref }
    />
  );
};