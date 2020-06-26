import React from 'react';
import useGame from '../../hooks/useGame';
import useImage from './useImage';
import map from './map.style';

export default function Map() {
  const { id: seed } = useGame();
  const image = useImage(seed);
  
  return (
    <div
      css={ map }
      data-loaded={ `${!!image}` }
      style={ {
        backgroundImage: image ? `url(${image.src})` : undefined,
      } }
    />
  );
};