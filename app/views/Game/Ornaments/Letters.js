import React from 'react';
import letters, { cell } from './letters.style';

const LETTERS = 'ABCDEFGHIJ'.split('');

export default function Letters() {
  return (
    <div css={ letters }>
      { LETTERS.map(letter => (
        <div key={ letter } css={ cell } data-letter={ letter } />
      )) }
    </div>
  );
}