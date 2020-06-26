import React from 'react';
import style from './pattern.style';
import usePattern from './usePattern';
import useBoard from '../../../hooks/useBoard';

export default function Pattern({ type }) {
  const { size } = useBoard();
  const pattern = usePattern(size, type);
  
  return (
    <div
      css={ style }
      data-type={ type }
      style={ {
        backgroundImage: `url(${pattern})`,
      } }
    />
  );
};