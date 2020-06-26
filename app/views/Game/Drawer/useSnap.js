import { useRef, useState, useEffect } from 'react';
import lerp from 'utils/lerp';

export default function useSnap(
  isDragging,
  drag,
  placed,
) {
  const snapRef = useRef({});
  const dragCheck = useRef(isDragging);
  const [state, setState] = useState({
    x: 0,
    y: 0,
    isSnapping: false,
  });

  useEffect(() => {
    if (!isDragging) return;
    snapRef.current.x = drag.x;
    snapRef.current.y = drag.y;
  }, [drag.x, drag.y]);

  useEffect(() => {
    const { current: wasDragging } = dragCheck;

    if (isDragging === wasDragging) return;

    if (!placed && !isDragging && wasDragging) {
      let raf;

      const isZeroish = value => Math.abs(value) < 0.1;

      const loop = () => {
        if (isZeroish(snapRef.current.x) && isZeroish(snapRef.current.y)) {
          return setState({
            x: 0,
            y: 0,
            isSnapping: false,
          });
        }

        snapRef.current.x = lerp(snapRef.current.x, 0, 0.2);
        snapRef.current.y = lerp(snapRef.current.y, 0, 0.2);

        setState({
          isSnapping: true,
          x: snapRef.current.x,
          y: snapRef.current.y,
        });
        
        raf = requestAnimationFrame(loop);
      };

      // update the state
      setState({
        x: snapRef.current.x,
        y: snapRef.current.y,
        isSnapping: true,
      });

      // mark as not dragging internally
      dragCheck.current = false;

      // animate
      requestAnimationFrame(loop);

      return () => cancelAnimationFrame(raf);
    }

    dragCheck.current = isDragging;
  }, [isDragging, placed]);

  return state;
};