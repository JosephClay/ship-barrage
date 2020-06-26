import React from 'react';
import useParallax from '../../hooks/useParallax';
import topOrnament, {
  circle,
  box,
  long,
  short,
} from './topOrnament.style';

const LONG_DEG = [18, 36, 54, 72];
const SHORT_DEG = [9, 27, 45, 63];

const render = (type, mul) => {
  return deg => (
    <div
      key={ deg }
      css={ [box, type] }
      style={ {
        transform: `rotate(${deg * mul}deg)`
      } } />
  );
};

const renderLong = render(long, 1);
const renderLongNeg = render(long, -1);
const renderShort = render(short, 1);
const renderShortNeg = render(short, -1);

const SCALE = 3;

export default function TopOrnament() {
  const { x } = useParallax(SCALE);

  return (
    <div css={ topOrnament } style={ { transform: `rotate(${x}deg)` } }>
      <div css={ circle } />
      <div css={ [box, long] } />
      { LONG_DEG.map(renderLong) }
      { LONG_DEG.map(renderLongNeg) }
      { SHORT_DEG.map(renderShort) }
      { SHORT_DEG.map(renderShortNeg) }
    </div>
  );
};