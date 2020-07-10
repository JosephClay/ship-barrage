import { useStore } from '@immutabl3/store/react';

export default function usePointer() {
  return useStore(['pointer']);
};