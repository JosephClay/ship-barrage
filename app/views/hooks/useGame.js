import { useStore } from '@immutabl3/store/react';

export default function useGame() {
  return useStore(['game']);
};