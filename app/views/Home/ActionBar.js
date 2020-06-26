import React from 'react';
import actionBar from './actionBar.style';

export default function ActionBar({ children }) {
  return (
    <nav css={ actionBar }>
      { children }
    </nav>
  );
};