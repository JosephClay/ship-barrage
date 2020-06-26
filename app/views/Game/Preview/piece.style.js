import { css } from '@emotion/core';

export default css`
  position: absolute;
  width: 10%;
	margin: 0;
	padding: 0;
	opacity: 0.6;
	pointer-events: none;
`;

export const rotation = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transform-origin: top left;
`;

export const icon = css`
	display: block;
	max-width: 100%;
	max-height: 100%;
`;