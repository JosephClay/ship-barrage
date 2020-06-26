import { useState, useEffect, useRef } from 'react';

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({});
  const node = useRef();

  useEffect(() => {
    if (!node.current) return;

    let request;
    const measure = () => {
      request = requestAnimationFrame(() => {
        setDimensions(node.getBoundingClientRect());
      });
    };

    measure();
    addEventListener('resize', measure);

    return () => {
      removeEventListener('resize', measure);
      cancelAnimationFrame(request);
    };
  }, [node.current]);

  return [node, dimensions];
};