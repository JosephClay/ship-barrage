import { useStore } from '@immutabl3/store/react';
import {
  STATE_HOME,
  STATE_NAMING,
  STATE_SHARING,
  STATE_JOINING,
} from 'settings';

export default function useViewState() {
  // TODO: break into 3
  const {
    loading,
    state,
    initialized,
  } = useStore({
    loading: ['loading'],
    state: ['state'],
    initialized: ['initialized'],
  });
  
  const isHome = state === STATE_HOME || state === STATE_NAMING || state === STATE_SHARING || state === STATE_JOINING;

  return {
    state,
    loading,
    initialized,
    isHome,
    isGame: !isHome,
    isMainMenu: state === STATE_HOME,
    isNaming: state === STATE_NAMING,
    isSharing: state === STATE_SHARING,
    isJoining: state === STATE_JOINING,
  };
};