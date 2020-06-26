import React from 'react';
import {
  radar,
  circle,
  scan,
} from './radar.style';

export default function Radar({ radius = '80vh' }) {
  return (
    <>
      <div css={ radar } />
      <div
        css={ circle }
        style={ {
          width: radius,
          height: radius,
        } }
      >
        <div css={ scan } />
        <div css={ scan } />
        <div css={ scan } />
      </div>
    </>
  );
};