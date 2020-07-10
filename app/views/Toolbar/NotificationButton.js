import React from 'react';
import signal from 'signal-js';
import Bell from '../icons/Bell';
import IconButton from '../components/IconButton';
import hasNotifications from '../../compatibility/hasNotifications';
import { useStore } from '@immutabl3/store/react';

const onToggle = () => signal.emit('notifications:toggle');

export default function NotificationButton(props) {
  if (!hasNotifications) return null;
  
  const active = useStore(['notifications']);

  return (
    <IconButton
      {...props}
      data-tooltip="NOTIFICATIONS"
      data-active={ `${active}` }
      onClick={ onToggle }
    >
      <Bell />
    </IconButton>
  );
};