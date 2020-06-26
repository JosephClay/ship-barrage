import { useState, useEffect } from 'react';
import perlinContours from 'perlin-contours';

export default function useImage(seed) {
  const [image, setImage] = useState();
  
  useEffect(() => {
    let active = true;
    if (image) {
      URL.revokeObjectURL(image);
      setImage(undefined);
    }

    (async function() {
      const img = await perlinContours(seed);
      active && setImage(img);
    }());
    
    return () => (active = false);
  }, [seed]);

  return image;
};