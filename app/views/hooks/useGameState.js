import { useStore } from '@immutabl3/store/react';
import {
  STATE_SETUP,
  STATE_ACTIVE,
  STATE_END,
  STATE_READY,
  MAX_HITS,
} from 'settings';

export default function Game() {
  // TODO: breakup
  const {
    gameState,
    playerState,
    hits,
  } = useStore({
    gameState: ['game', 'state'],
    playerState: ['game', 'playerState'],
    hits: ['game', 'hits'],
  });

  return {
    isWinner: hits === MAX_HITS,
    isSetup: gameState === STATE_SETUP,
    isActive: gameState === STATE_ACTIVE,
    isEnd: gameState === STATE_END,
    isPlayerReady: playerState === STATE_READY,
  };
};