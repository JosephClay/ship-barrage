import React from 'react';
import target, { two, three } from './target.style';
import useParallax from '../../hooks/useParallax';

const SCALE_SMALL = 10;
const SCALE_LARGE = 15;

export default function Target() {
  const { x } = useParallax();

  return (
    <>
      <div css={ target } />
      <div css={ [target, two] } style={ { transform: `translate(-50%, -50%) rotateY(${-(x * SCALE_SMALL)}deg)` } } />
      <div css={ [target, three] } style={ { transform: `translate(-50%, -50%) rotateY(${-(x * SCALE_LARGE)}deg)` } } />
    </>
  );
};