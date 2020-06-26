import { useState, useEffect } from 'react';

export default function useActiveToggle(active, duration = 1000) {
  const [isActive, setActive] = useState(active);

  useEffect(() => {
    // nothing changed
    if (isActive === active) return;
    // in
    if (!isActive && active) return setActive(true);
    // out
    const timeout = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timeout);
  }, [active]);
  
  return isActive;
};