import React from 'react';
import github from './github.style';
import OctoCat from '../icons/OctoCat';

export default function GitHub() {
  return (
    <a
      css={ github }
      href="https://github.com/JosephClay/battleship"
      aria-label="View source on GitHub"
    >
      <OctoCat />
    </a>
  );
};