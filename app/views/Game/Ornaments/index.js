import React from 'react';
import Bar from './Bar';
import Pattern from './Pattern';
import Numbers from './Numbers';
import Letters from './Letters';
import {
  HORIZONTAL,
  VERTICAL,
} from 'settings';

export default function Ornaments() {
  return (
    <>
      <Bar type={ HORIZONTAL } />
      <Bar type={ VERTICAL } />
      <Pattern type={ HORIZONTAL } />
      <Pattern type={ VERTICAL } />
      <Numbers />
      <Letters />
    </>
  );
};