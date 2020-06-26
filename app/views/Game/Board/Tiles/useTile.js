import { useMemo } from 'react';
import draw from './draw';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

export default function useTile(cellSize, minimized) {
  return useMemo(() => {    
    canvas.width = cellSize;
    canvas.height = cellSize;
    draw(ctx, cellSize, minimized);
    return canvas.toDataURL();
  }, [cellSize]);
};