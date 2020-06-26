import { useRef, useState, useEffect } from 'react';
import coords from '../../../../../battleship/coords';

export default function useWaves(attacks = {}) {
  const attackState = useRef();
  const [waves, setWaves] = useState([]);
  
  useEffect(() => {
    // not defined yet, this is our first effect
    if (attackState.current === undefined) {
      attackState.current = { ...attacks };
      return;
    }

    const newWaves = Object
      // get entries
      .entries(attacks)
      // check they're not accounted for
      .filter(([key]) => !(key in attackState.current))
      // make into wave objects
      .map(([key]) => ({
        key,
        coords: coords(key),
        onDone() {
          setWaves(
            waves.filter(({ key: id }) => id !== key)
          );
        },
      }));

    setWaves([
      ...waves,
      ...newWaves,
    ]);

    // update saved attacks
    attackState.current = { ...attacks };
  }, [Object.keys(attacks).length]);

  return waves;
};