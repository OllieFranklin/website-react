import React from 'react';
import { isEqual } from 'lodash';

import { Game, KeyState, BoardLetter, Statistics } from '../model';

const useTetrisController = () => {
  const [isPaused, setIsPaused] = React.useState<boolean>(true);

  const game = React.useRef<Game | null>(null);
  const keyState = React.useRef<KeyState>({
    down: false,
    left: false,
    right: false,
    rotateCW: false,
    rotateACW: false,
  });

  const boardRef = React.useRef<BoardLetter[][]>([]);
  const nextPieceRef = React.useRef<BoardLetter[][]>([]);
  const [stats, setStats] = React.useState<Statistics>({
    burn: 0,
    drought: 0,
    level: 0,
    lines: 0,
    score: 0,
    tetrisRate: 0,
  });
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => handleKeyPress(event, true),
    [],
  );

  const handleKeyUp = React.useCallback(
    (event: KeyboardEvent) => handleKeyPress(event, false),
    [],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const nextFrame = React.useCallback(() => {
    if (isPaused || game.current === null) return;

    const gameState = game.current.nextFrame(keyState.current);
    boardRef.current = gameState.board;
    nextPieceRef.current = gameState.nextPiece;

    const newStats = gameState.statistics;

    if (!isEqual(stats, newStats)) {
      setStats(newStats);
    }

    const newIsGameOver = gameState.isGameOver;
    if (newIsGameOver !== isGameOver) {
      setIsGameOver(newIsGameOver);
    }
  }, [stats, setStats, isPaused, isGameOver, setIsGameOver]);

  const pauseGame = () => {
    setIsPaused(true);
  };

  const startGame = (level: number) => {
    game.current = new Game(level);
    nextFrame();
    setIsPaused(false);
  };

  const handleKeyPress = (event: KeyboardEvent, isPressed: boolean) => {
    const { repeat, key } = event;
    if (repeat) return;

    switch (key) {
      case 'ArrowDown':
        keyState.current.down = isPressed;
        break;
      case 'ArrowLeft':
        keyState.current.left = isPressed;
        break;
      case 'ArrowRight':
        keyState.current.right = isPressed;
        break;
      case 'z': // Z
        keyState.current.rotateCW = isPressed;
        break;
      case 'x': // X
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

  return { stats, boardRef, nextPieceRef, startGame, pauseGame, isGameOver };
};

export { useTetrisController };
