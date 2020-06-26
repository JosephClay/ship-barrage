import React from 'react';
import Home from './Home';
import Game from './Game';
import Loading from './Loading';
import useViewState from './hooks/useViewState';

export default function View() {
  const { loading, initialized } = useViewState();
  return (
    <>
      { !initialized || loading && <Loading /> }
      { initialized && (
        <>
          <Home />
          <Game />
        </>
      ) }
    </>
  );
};