import { useStore } from '@immutabl3/store/react';

export default function useDrag() {
  return useStore(['drag']);
};