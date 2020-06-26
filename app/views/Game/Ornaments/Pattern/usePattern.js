import { useMemo } from 'react';
import draw from './draw';
import generate from './generate';
import {
  HORIZONTAL,
  VERTICAL,
} from 'settings';

const THICKNESS = 5;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

export default function usePattern(size, type) {
  return useMemo(() => {    
    const width = canvas.width = type === HORIZONTAL ? size : THICKNESS;
    const height = canvas.height = type === VERTICAL ? size : THICKNESS;
    draw(ctx, type, width, height, generate(size));
    return canvas.toDataURL();
  }, [size, type]);
};