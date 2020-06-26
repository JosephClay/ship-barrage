// import repeat from 'utils/repeat';

export const PIXEL = 0;
export const POINT = 1;
export const LONG = 2;
export const SHORT = 3;

// export const DOTS = [
//   LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 12), 
//   LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 12), 
//   LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 5), LONG, repeat(SHORT, 12), LONG, repeat(SHORT, 5), LONG,
// ].flat();
export const DOTS = JSON.parse(`[2,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2]`);

// export const DOTS_SIZE = 82 * 2;
export const DOTS_SIZE = 164;

// export const DASH = [repeat(PIXEL, 50), repeat(POINT, 3)].flat();
export const DASH = JSON.parse(`[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1]`);

// export const DASH_SIZE = 53 + 5;
export const DASH_SIZE = 58;