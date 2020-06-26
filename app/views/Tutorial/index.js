import React from 'react';
import signal from 'signal-js';
import Modal from '../components/Modal';
import Interact from '../components/Interact';
import tutorial, { icon } from './tutorial.style';
import useStore from '../hooks/useStore';

const onTutorialClose = () => signal.emit('tutorial:close');

export default function Tutorial() {
  const active = useStore(['tutorial']);

  return (
    <Modal active={ active } onClose={ onTutorialClose }>
      <section css={ tutorial }>
        <p>
          Rules 
        </p>
        <ol>
          <li>
            SHIP BARRAGE is a game played by two players
          </li>
          <li>
            Each player takes turns guessing where the opponent has placed their ships
          </li>
          <li>
            <div css={ icon } data-hit /> is a hit
            <div css={ icon } data-miss /> is a miss
          </li>
          <li>
            Ships sink when every square they occupy has been hit
          </li>
          <li>
            The game ends when either player loosed all their ships
          </li>
        </ol>
        <p>
          Instructions
        </p>
        <ol>
          <li>
            Drag ships to place them
          </li>
          <li>
            <Interact /> on ships to rotate them
          </li>
          <li>
            <Interact /> on the opponent's board to attack
          </li>
        </ol>
      </section>
    </Modal>
  );
};