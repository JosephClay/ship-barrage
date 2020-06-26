import React from 'react';
import TopOrnament from './TopOrnament';
import Target from './Target';
import BottomOrnament from './BottomOrnament';
import Radar from '../../components/Radar';
import background from './background.style';
import { DURATION_OUT } from 'theme';
import useActiveToggle from '../../hooks/useActiveToggle';

export default function Background({ active }) {
  const isActive = useActiveToggle(active, DURATION_OUT);

  return (
    <div
      css={ background }
      data-active={ `${active}` }
    >
      { isActive && (
        <>
          <TopOrnament />
          <Target />
          <BottomOrnament />
          <Radar />
        </>
      ) }
    </div>
  );
};