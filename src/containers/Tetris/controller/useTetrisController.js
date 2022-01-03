import React from 'react';

import { Game, KeyState } from '../model';

export const useTetrisController = () => {
  const game = React.useRef(null);
  const timer = React.useRef(null);
  const gameState = React.useRef(null);
  const keyState = React.useRef(
    new KeyState(false, false, false, false, false),
  );

  React.useEffect(() => {
    document.addEventListener('keydown', event => handleKeyPress(event, true));
    document.addEventListener('keyup', event => handleKeyPress(event, false));
  }, []);

  const nextFrame = async () => {
    gameState.current = game.current.nextFrame(keyState.current);

    if (game.current.isGameOver) {
      clearInterval(timer);
      // WebpageController.gameOver();
    }
  };

  const pauseGame = () => {
    clearInterval(timer.current);
  };

  const startGame = level => {
    game.current = new Game(level);

    timer.current = setInterval(nextFrame, 1000 / 60);
  };

  const handleKeyPress = (event, isPressed) => {
    if (event.repeat) return;

    switch (event.keyCode) {
      case 40: // DOWN
        keyState.current.down = isPressed;
        break;
      case 37: // LEFT
        keyState.current.left = isPressed;
        break;
      case 39: // RIGHT
        keyState.current.right = isPressed;
        break;
      case 90: // Z
        keyState.current.rotateCW = isPressed;
        break;
      case 88: // X
        keyState.current.rotateACW = isPressed;
        break;
      default:
    }
  };

  return { gameState, startGame, togglePlayPause: pauseGame, nextFrame };
};
