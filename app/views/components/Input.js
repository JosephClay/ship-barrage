import React from 'react';
import input from './input.style';

export default function Input(props) {
  return (
    <input
      ref={ props.onRef }
      css={ input }
      {...props}
    />
  );
};