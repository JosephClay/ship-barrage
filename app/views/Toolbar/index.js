import React from 'react';
import toolbar, { button } from './toolbar.style';
import HelpButton from './HelpButton';
import NotificationButton from './NotificationButton';
import SoundButton from './SoundButton';

export default function Toolbar() {
  return (
    <nav css={ toolbar }>
      <SoundButton css={ button } />
      <NotificationButton css={ button } />
      <HelpButton css={ button } />
    </nav>
  );
};