import { useStore as useStoreStore } from '@immutabl3/store/react';

// TODO: kill this useStore

export default function useStore(selector) {
  return useStoreStore(selector);
};