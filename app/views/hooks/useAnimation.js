import { useState, useEffect } from 'react';

const inExpo = num => Math.pow(2, 10 * (num - 1));

const useAnimationTimer = function(duration) {
  const [elapsed, setTime] = useState(0);

  useEffect(() => {
    let raf;
    
    const start = Date.now();

    // Function to be executed on each animation frame
    const onFrame = () => {
      setTime(Date.now() - start);
      // eslint-disable-next-line no-use-before-define
      loop();
    };

    // Call onFrame() on next animation frame
    const loop = () => {
      raf = requestAnimationFrame(onFrame);
    };

    // Set a timeout to stop things when duration time elapses
    const timerStop = setTimeout(() => {
      cancelAnimationFrame(raf);
      setTime(Date.now() - start);
    }, duration);

    // Start the loop
    loop();

    // Clean things up
    return () => {
      clearTimeout(timerStop);
      cancelAnimationFrame(raf);
    };
  }, [duration]);

  return elapsed;
};

export default function useAnimation(
  duration = 500,
  easing = inExpo,
) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const value = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing(value);
};