import React from 'react';
import Radar from '../components/Radar';
import loading, { ring } from './loading.style';

export default function Loading() {
  return (
    <div css={ loading }>
      <div css={ ring } />
      <div css={ ring } />
      <div css={ ring } />
      <Radar radius={ 50 } />
    </div>
  );
};