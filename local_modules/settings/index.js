export const STATE_SETUP = 's';
export const STATE_READY = 'r';
export const STATE_ACTIVE = 'a';
export const STATE_END = 'e';

export const STATE_HOME = 'h';
export const STATE_NAMING = 'n';
export const STATE_SHARING = 's';
export const STATE_JOINING = 'j';
export const STATE_PLAYING = 'p';

export const ORIENTATION = 'o';

export const VERTICAL = 'v';
export const HORIZONTAL = 'h';

export const MIN_COORD = 0;
export const MAX_COORD = 9;

export const HIT = 1;
export const MISS = -1;

export const MAX_HITS = 17;

export const MAX_SESSIONS = 5;

export const MIN_WIDTH = 1024;
export const MINIMIZED_MIN_SIZE = 115;
export const MAX_BOARD_SIZE = 400;

export const CELL_COUNT = 10;

// NOTE: need the escape here for use in browser input validation
// eslint-disable-next-line no-useless-escape
export const PAT_IS_NAME = '[A-Za-z0-9 !@#$%^&*()_\-+=|:;<>,.?~`]';

export const R_IS_NAME = () => /^[A-Za-z0-9 !@#$%^&*()_\-+=|:;<>,.?~`]+$/;

export const R_IS_ID = () => /^[A-Za-z0-9]+$/;

export const SOUND_HIT = 'explosion';
export const SOUND_MISS = 'whoosh';
export const SOUND_CHIME = 'chime';
export const SOUND_HOVER = 'ping';
export const SOUND_CLICK = 'click';
export const SOUND_PLACE = 'splash';
export const SOUND_TRANSITION = 'transition';