import React from 'react';
import numbers, { cell } from './numbers.style';
import range from 'utils/range';

const NUMBERS = range(10).map(idx => idx + 1);

export default function Numbers() {
  return (
    <div css={ numbers }>
      { NUMBERS.map(number => (
        <div key={ number } css={ cell } data-number={ number } />
      )) }
    </div>
  );
}