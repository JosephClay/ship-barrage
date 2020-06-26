import React from 'react';
import { Global } from '@emotion/core';
import useRoot from 'baobab-react/useRoot';
import View from './View';
import Toolbar from './Toolbar';
import Messages from './Messages';
import Tutorial from './Tutorial';
import app from './app.style';
import GitHub from './common/GitHub';
import Credits from './common/Credits';

export default function App({ store }) {
  const Root = useRoot(store);

  return (
    <Root>
      <Global styles={ app } />
      <Tutorial />
      <GitHub />
      <Credits />
      <Toolbar />
      <Messages />
      <View />
    </Root>
  );
};