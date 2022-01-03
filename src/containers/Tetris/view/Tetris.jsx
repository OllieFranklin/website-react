import React from 'react';
import { GameOver } from './GameOver';
import { LevelSelect } from './LevelSelect';
import { GameBoard } from './GameBoard';
import { useTetrisHook } from './useTetrisHook';

import './Tetris.css';
import testOutput from '../test-output.json';

export const Tetris = () => {
  const { GameStates, gameState } = useTetrisHook();

  React.useEffect(() => {
    console.log(testOutput);
  }, []);

  return (
    <>
      <nav id="navigation"></nav>

      <div id="page" className="container-fluid align-items-center vh-100">
        {gameState === GameStates.LEVEL_SELECT && <LevelSelect />}
        {gameState === GameStates.PLAYING && <GameBoard />}
        {gameState === GameStates.GAME_OVER && <GameOver />}
      </div>
    </>
  );
};
