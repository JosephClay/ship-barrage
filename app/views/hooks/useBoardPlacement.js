import useBoard from './useBoard';
import useScreen from './useScreen';
import {
  MIN_WIDTH,
  MINIMIZED_MIN_SIZE,
} from 'settings';

const calculateStats = (size, x, y) => ({
  size: Math.round(size / 2),
  x: x - Math.round(size / 2) - 80,
  y: y + Math.round(size / 2) + 15,
});

const calculateStatsMin = (size, x, y) => ({
  size: Math.round(size / 2) - 15,
  x: x + MINIMIZED_MIN_SIZE + 15,
  y: y + size + 15,
});

const calculateMinimized = (size, x, y) => ({
  size: Math.round(size / 2),
  x: x - Math.round(size / 2) - 80,
  y,
});

const calculateMinimizedMin = (size, x, y) => ({
  size: MINIMIZED_MIN_SIZE,
  x,
  y: y + size + 15,
});

export default function useBoardPlacement({ stats, minimized } = {}) {
  const { width } = useScreen();
  const { size, top: y, left: x } = useBoard();

  if (stats && width < MIN_WIDTH) return calculateStatsMin(size, x, y);
  if (stats) return calculateStats(size, x, y);

  if (minimized && width < MIN_WIDTH) return calculateMinimizedMin(size, x, y);
  if (minimized) return calculateMinimized(size, x, y);

  return {
    size,
    x,
    y
  };
};