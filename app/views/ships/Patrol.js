import React from 'react';
import patrol from './patrol.style';

export default function Patrol(props) {
  return (
    <svg css={ patrol } {...props} viewBox="0 0 15 45">
      <path data-color="1" d="M 2.882812 42.710938 C 2.421875 41.890625 1.847656 35.753906 1.5 28.964844 C 0.808594 16.363281 2.421875 7.445312 6.230469 2.535156 C 7.730469 0.65625 7.730469 0.65625 9.578125 3.84375 C 13.152344 10.226562 14.191406 16.9375 13.5 29.289062 C 13.152344 35.917969 12.578125 41.890625 12.117188 42.710938 C 11.652344 43.527344 10.039062 44.019531 7.5 44.019531 C 4.960938 44.019531 3.347656 43.527344 2.882812 42.710938 Z M 2.882812 42.710938 "/>
      <path data-color="2" d="M 3 37.554688 C 2.652344 34.773438 2.421875 30.601562 2.421875 28.308594 C 2.539062 24.710938 2.652344 24.464844 3.460938 26.589844 C 3.921875 27.980469 4.382812 30.519531 4.5 32.398438 C 4.730469 38.78125 10.269531 38.863281 10.5 32.398438 C 10.617188 30.601562 11.078125 27.980469 11.539062 26.589844 C 12.347656 24.464844 12.460938 24.710938 12.578125 28.308594 C 12.578125 30.601562 12.347656 34.773438 12 37.554688 C 11.191406 42.546875 11.191406 42.546875 7.5 42.546875 C 3.808594 42.546875 3.808594 42.546875 3 37.554688 Z M 3 37.554688 "/>
      <path data-color="2" d="M 6.460938 35.835938 C 5.539062 33.628906 4.039062 23.238281 4.382812 21.4375 C 4.617188 20.128906 5.539062 19.636719 7.5 19.636719 C 10.730469 19.636719 11.421875 21.601562 10.152344 26.589844 C 9.691406 28.390625 9.347656 31.253906 9.230469 32.890625 C 9.230469 35.917969 7.269531 37.882812 6.460938 35.835938 Z M 9 24.382812 C 8.769531 22.910156 8.191406 21.683594 7.5 21.683594 C 6.921875 21.683594 6.230469 22.910156 6 24.382812 C 5.652344 26.34375 6.117188 27 7.5 27 C 8.882812 27 9.347656 26.34375 9 24.382812 Z M 9 24.382812 "/>
      <path data-color="2" d="M 2.769531 16.773438 C 3.117188 13.664062 4.152344 9 5.191406 6.546875 C 7.5 1.390625 8.191406 1.882812 10.960938 9.898438 C 12.921875 15.789062 13.269531 23.808594 11.539062 20.699219 C 10.847656 19.390625 9.460938 18.816406 7.5 18.816406 C 5.539062 18.816406 4.152344 19.472656 3.347656 20.699219 C 2.539062 22.007812 2.421875 21.027344 2.769531 16.773438 Z M 9.230469 15.136719 C 9.230469 14.480469 8.421875 13.910156 7.5 13.910156 C 6.578125 13.910156 5.769531 14.480469 5.769531 15.136719 C 5.769531 15.789062 6.578125 16.363281 7.5 16.363281 C 8.421875 16.363281 9.230469 15.789062 9.230469 15.136719 Z M 9.230469 15.136719 "/>
      <path data-color="3" d="M 3 36.65625 C 2.652344 35.589844 2.421875 32.726562 2.421875 30.273438 C 2.539062 26.835938 2.769531 26.261719 3.460938 27.816406 C 3.921875 28.964844 4.382812 31.335938 4.5 33.21875 C 4.617188 35.019531 5.191406 36.898438 6 37.472656 C 7.039062 38.210938 6.921875 38.453125 5.539062 38.453125 C 4.5 38.453125 3.460938 37.636719 3 36.65625 Z M 3 36.65625 "/>
      <path data-color="3" d="M 9 37.472656 C 9.808594 36.898438 10.382812 35.019531 10.5 33.21875 C 10.617188 31.335938 11.078125 28.964844 11.539062 27.816406 C 12.230469 26.261719 12.460938 26.835938 12.578125 30.273438 C 12.691406 36 11.769531 38.453125 9.460938 38.453125 C 8.078125 38.453125 7.960938 38.210938 9 37.472656 Z M 9 37.472656 "/>
      <path data-color="3" d="M 6.460938 36.246094 C 6.117188 36 5.769531 34.28125 5.769531 32.5625 C 5.769531 30.355469 6.230469 29.453125 7.5 29.453125 C 8.769531 29.453125 9.230469 30.355469 9.230469 32.644531 C 9.230469 35.753906 8.078125 37.308594 6.460938 36.246094 Z M 6.460938 36.246094 "/>
      <path data-color="3" d="M 4.617188 26.183594 C 3.691406 21.355469 4.5 19.636719 7.5 19.636719 C 10.5 19.636719 11.308594 21.355469 10.382812 26.183594 C 9.921875 29.046875 9.921875 29.046875 9.230469 25.363281 C 8.882812 23.316406 8.191406 21.683594 7.5 21.683594 C 6.921875 21.683594 6.117188 23.316406 5.769531 25.363281 C 5.078125 29.046875 5.078125 29.046875 4.617188 26.183594 Z M 4.617188 26.183594 "/>
      <path data-color="3" d="M 2.421875 18.328125 C 2.308594 14.808594 2.652344 14.074219 4.960938 13.335938 C 6.691406 12.761719 8.308594 12.761719 10.152344 13.335938 C 12.347656 14.074219 12.691406 14.808594 12.578125 18.328125 C 12.578125 21.683594 12.347656 22.089844 11.539062 20.699219 C 10.847656 19.390625 9.460938 18.816406 7.5 18.816406 C 5.539062 18.816406 4.152344 19.390625 3.460938 20.699219 C 2.652344 22.089844 2.421875 21.683594 2.421875 18.328125 Z M 9.230469 15.136719 C 9.230469 14.480469 8.421875 13.910156 7.5 13.910156 C 6.578125 13.910156 5.769531 14.480469 5.769531 15.136719 C 5.769531 15.789062 6.578125 16.363281 7.5 16.363281 C 8.421875 16.363281 9.230469 15.789062 9.230469 15.136719 Z M 9.230469 15.136719 "/>
      <path data-color="3" d="M 3.460938 12.027344 C 3.460938 11.453125 4.269531 8.917969 5.308594 6.464844 L 7.269531 2.046875 L 8.769531 4.5 C 9.578125 5.890625 10.617188 8.425781 10.960938 10.144531 C 11.769531 13.089844 11.652344 13.253906 9.691406 12.4375 C 8.308594 11.863281 6.808594 11.863281 5.539062 12.355469 C 4.039062 12.925781 3.460938 12.84375 3.460938 12.027344 Z M 3.460938 12.027344 "/>
      <path data-color="4" d="M 3.460938 40.910156 C 3.460938 39.601562 4.269531 39.273438 7.5 39.273438 C 10.730469 39.273438 11.539062 39.601562 11.539062 40.910156 C 11.539062 42.21875 10.730469 42.546875 7.5 42.546875 C 4.269531 42.546875 3.460938 42.21875 3.460938 40.910156 Z M 3.460938 40.910156 "/>
    </svg>
  );
};