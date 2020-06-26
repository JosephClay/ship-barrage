import { useRef, useContext, useState, useEffect } from 'react';
import Context from './context';
import deepEqual from 'fast-deep-equal';

const useDeepCompareMemoize = value => {
  const ref = useRef();
  
  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export default function useBranch(cursors) {
  const context = useContext(Context);

  const [state, setState] = useState(() => context.tree.project(cursors));

  useEffect(() => {
    const watcher = context.tree.watch(cursors);

    watcher.on('update', () => {
      const obj = watcher.get();
      setState(obj);
    });

    setState(context.tree.project(cursors));

    return () => watcher.release();
  }, [useDeepCompareMemoize(cursors)]);

  return state;
};