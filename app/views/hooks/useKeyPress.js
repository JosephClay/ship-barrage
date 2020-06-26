import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const onKeyDown = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  // Add event listeners
  useEffect(() => {
    global.addEventListener('keydown', onKeyDown);
    return () => global.removeEventListener('keydown', onKeyDown);
  }, []);

  return keyPressed;
};