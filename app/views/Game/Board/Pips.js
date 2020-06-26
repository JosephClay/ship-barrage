import React from 'react';
import range from 'utils/range';
import { horizontal, vertical } from './line.style';

const iterator = range(10).map(idx => idx + 1);

export default function Pips({ getPosition }) {
  return (
    <>
      {
        // top
        iterator.map(idx => {
          const x = getPosition(idx) - 1;
          return (
            <div
              key={ idx }
              css={ vertical }
              style={ {
                opacity: 0.3,
                height: 3,
                transform: `translate(${x}px, 1px)`,
              } }
            />
          );
        })
      }
      {
        // left
        iterator.map(idx => {
          const y = getPosition(idx) - 1;
          return (
            <div
              key={ idx }
              css={ horizontal }
              style={ {
                opacity: 0.3,
                width: 3,
                transform: `translate(1px, ${y}px)`,
              } }
            />
          );
        })
      }
    </>
  );
};