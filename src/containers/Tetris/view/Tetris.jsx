import React from 'react';
import { GameOver } from './GameOver';
import { LevelSelect } from './LevelSelect';
import { GameBoard } from './GameBoard';
import { useTetrisView } from './useTetrisView';

import './Tetris.css';

export const Tetris = () => {
  const { GameStates, gameState } = useTetrisView();

  return (
    <div
      id="page"
      className="my-container-fluid my-align-items-center my-vh-100"
    >
      {gameState === GameStates.LEVEL_SELECT && <LevelSelect />}
      {gameState === GameStates.PLAYING && <GameBoard />}
      {gameState === GameStates.GAME_OVER && <GameOver />}
    </div>
  );
};
