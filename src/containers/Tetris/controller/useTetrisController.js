import React from 'react';
import { isEqual, pick } from 'lodash';

import { Game, KeyState } from '../model';

export const useTetrisController = () => {
  const [isPaused, setIsPaused] = React.useState(true);

  const game = React.useRef(null);
  const keyState = React.useRef(
    new KeyState(false, false, false, false, false),
  );

  const board = React.useRef(null);
  const [stats, setStats] = React.useState({});

  React.useEffect(() => {
    document.addEventListener('keydown', event => handleKeyPress(event, true));
    document.addEventListener('keyup', event => handleKeyPress(event, false));
  }, []);

  const nextFrame = React.useCallback(() => {
    if (isPaused) return;

    const gameState = game.current.nextFrame(keyState.current);
    board.current = gameState.board;

    const statsFields = [
      'nextPiece',
      'level',
      'lines',
      'score',
      'tetrisRate',
      'drought',
      'burn',
    ];

    const newStats = pick(gameState, statsFields);

    if (!isEqual(stats, newStats)) {
      setStats(newStats);
    }

    if (gameState.isGameOver) {
      setIsPaused(true);
      // WebpageController.gameOver();
    }
  }, [stats, setStats, isPaused, setIsPaused]);

  const pauseGame = () => {
    setIsPaused(true);
  };

  const startGame = level => {
    game.current = new Game(level);
    nextFrame();
    setIsPaused(false);
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

  React.useEffect(() => {
    const timer = setInterval(nextFrame, 1000 / 60);

    return () => {
      clearInterval(timer);
    };
  }, [nextFrame]);

  return {
    stats,
    board,
    startGame,
    pauseGame,
  };
};
