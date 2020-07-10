import React from 'react';
import { Global } from '@emotion/core';
import { useContext } from '@immutabl3/store/react';
import View from './View';
import Toolbar from './Toolbar';
import Messages from './Messages';
import Tutorial from './Tutorial';
import app from './app.style';
import GitHub from './common/GitHub';
import Credits from './common/Credits';

export default function App({ store }) {
  const Context = useContext(store);

  return (
    <Context>
      <Global styles={ app } />
      <Tutorial />
      <GitHub />
      <Credits />
      <Toolbar />
      <Messages />
      <View />
    </Context>
  );
};