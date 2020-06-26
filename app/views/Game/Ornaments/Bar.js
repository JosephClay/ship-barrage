import React from 'react';
import bar from './bar.style';

export default function Bar({ type }) {
  return <div css={ bar } data-type={ type } />;
};