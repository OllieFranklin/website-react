import React from 'react';
import isEqual from 'lodash/isEqual';

import {
  Game,
  KeyState,
  BoardLetter,
  InGameStatistics,
  GameOverStatistics,
} from '../model';

type UserInput =
  | { type: 'keyboard'; key: string }
  | { type: 'controller'; something: any };

type Action =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'rotateCW'
  | 'rotateACW'
  | 'togglePause'
  | 'continue';
type Controls = { [key in Action]: UserInput[] };

const defaultControls: Controls = {
  up: [{ type: 'keyboard', key: 'ArrowUp' }],
  down: [{ type: 'keyboard', key: 'ArrowDown' }],
  left: [{ type: 'keyboard', key: 'ArrowLeft' }],
  right: [{ type: 'keyboard', key: 'ArrowRight' }],
  rotateCW: [{ type: 'keyboard', key: 'z' }],
  rotateACW: [{ type: 'keyboard', key: 'x' }],
  togglePause: [{ type: 'keyboard', key: 'Enter' }],
  continue: [{ type: 'keyboard', key: 'Enter' }],
};

const controls = defaultControls;

const actionsByKey = (() => {
  const actions = new Map<string, Action[]>();

  for (const action of Object.keys(controls) as Action[]) {
    for (const input of controls[action]) {
      if (input.type !== 'keyboard') continue;
      const { key } = input;

      const currentActions = actions.get(key) ?? [];
      actions.set(key, [...currentActions, action]);
    }
  }

  return actions;
})();

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
  const [stats, setStats] = React.useState<
    | null
    | { type: 'inGame'; value: InGameStatistics }
    | { type: 'gameOver'; value: GameOverStatistics }
  >(null);
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

    if (!isEqual(stats?.value, gameState.statistics)) {
      if (gameState.isGameOver) {
        setStats({ type: 'gameOver', value: gameState.statistics });
      } else {
        setStats({ type: 'inGame', value: gameState.statistics });
      }
    }

    if (gameState.isGameOver !== isGameOver) {
      setIsGameOver(gameState.isGameOver);
    }
  }, [stats, setStats, isPaused, isGameOver, setIsGameOver]);

  const togglePlayPause = () => {
    setIsPaused(p => !p);
  };

  const startGame = (level: number) => {
    game.current = new Game(level);
    nextFrame();
    setIsPaused(false);
  };

  const handleKeyPress = (event: KeyboardEvent, isPressed: boolean) => {
    const { repeat, key } = event;
    if (repeat) return;

    const actions = actionsByKey.get(key) ?? [];

    for (const action of actions) {
      switch (action) {
        case 'down':
          keyState.current.down = isPressed;
          break;
        case 'left':
          keyState.current.left = isPressed;
          break;
        case 'right':
          keyState.current.right = isPressed;
          break;
        case 'rotateCW':
          keyState.current.rotateCW = isPressed;
          break;
        case 'rotateACW':
          keyState.current.rotateACW = isPressed;
          break;
      }
    }
  };

  React.useEffect(() => {
    const intervalID = setInterval(nextFrame, 1000 / 60);

    return () => clearInterval(intervalID);
  }, [nextFrame]);

  return {
    stats,
    boardRef,
    nextPieceRef,
    startGame,
    togglePlayPause,
    isGameOver,
  };
};

export { useTetrisController };
