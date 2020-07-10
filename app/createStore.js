import Store from '@immutabl3/store';
import Game from './managers/Game';
import Name from './managers/Name';
import Pointer from './managers/Pointer';
import Audio from './managers/Audio';
import Player from './managers/Player';
import Board from './managers/Board';
import Vessels from './managers/Vessels';
import Notifications from './managers/Notifications';
import Screen from './managers/Screen';
import { STATE_HOME } from 'settings';

export default () => Store({
  initialized: false,
  loading: true,
  state: STATE_HOME,
  playerId: Player.id(),
  playerName: Name.get(),
  sessions: [],
  board: Board.get(),
  drag: Vessels.get(),
  screen: Screen.get(),
  pointer: Pointer.get(),
  stats: [],
  game: Game.get(),
  messages: [],
  notifications: Notifications.get(),
  sound: Audio.get(),
  tutorial: false,
});