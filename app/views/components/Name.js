import React from 'react';
import style from './name.style';

export default function Name({ name }) {
  return (
    <span css={ style }>
      { name }
    </span>
  );
};