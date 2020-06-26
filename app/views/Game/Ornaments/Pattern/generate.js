import repeat from 'utils/repeat';
import take from 'utils/take';
import {
  DOTS,
  DOTS_SIZE,
  DASH,
  DASH_SIZE,
} from '../../../../static/pattern.json';

export default function generate(size) {
  const fill = size - DOTS_SIZE;
  const lines = Math.ceil(fill / DASH_SIZE);
  return [
    // put in the pattern
    ...DOTS,
    // then fill in with the dash pattern
    ...take(repeat(DASH, lines).flat(), fill),
  ];
};