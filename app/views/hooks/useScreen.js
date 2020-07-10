import { useStore } from '@immutabl3/store/react';

export default function useScreen() {
  return useStore(['screen']);
};