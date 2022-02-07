import React from 'react';
import Box from '@mui/material/Box';

import { GameOver } from './GameOver';
import { LevelSelect } from './LevelSelect';
import { GameBoard } from './GameBoard';
import { useTetrisView } from './useTetrisView';

import './Tetris.css';

export const Tetris = () => {
  const { GameStates, gameState } = useTetrisView();

  return (
    <Box
      className="my-container-fluid my-align-items-center my-vh-100"
      pt={6}
      sx={{
        background: '#ededed',
        minHeight: '500px',
        overflowY: 'inherit',
        height: '100vh',
      }}
    >
      {gameState === GameStates.LEVEL_SELECT && <LevelSelect />}
      {gameState === GameStates.PLAYING && <GameBoard />}
      {gameState === GameStates.GAME_OVER && <GameOver />}
    </Box>
  );
};
