import React from 'react';
import Header from './Header';
import Info from './Info';
import Desktop from './Desktop';
import Summary from './Summary';
import Drawer from './Drawer';
import Preview from './Preview';
import Stats from './Stats';
import Halo from './Halo';
import Grid from './Grid';
import Container from './Container';
import Background from './Background';
import Ornaments from './Ornaments';
import TargetingCursor from './TargetingCursor';
import useGameState from '../hooks/useGameState';
import useViewState from '../hooks/useViewState';

export default function Game() {
  const {
    isGame,
  } = useViewState();
  const {
    isWinner,
    isSetup,
    isActive,
    isEnd,
    isPlayerReady,
  } = useGameState();

  return (
    <Container active={ isGame }>
      { isActive && <TargetingCursor /> }
      <Header />
      { !isEnd && (
        <Desktop hideCursor={ isActive }>
          { isGame && <Info /> }
          <Grid attack={ isActive }>
            <Ornaments />
          </Grid>
          { isSetup && <Drawer disabled={ isPlayerReady } /> }
        </Desktop>
      ) }
      { isActive && <Stats /> }
      { isActive && <Preview /> }
      { isEnd && <Summary isWinner={ isWinner } /> }
      <Halo />
      <Background
        isGame={ isGame }
        isWinner={ isWinner }
        isActive={ isActive }
        isEnd={ isEnd }
      />
    </Container>
  );
};