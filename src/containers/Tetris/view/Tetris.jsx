import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { GameOver } from './GameOver';
import { LevelSelect } from './LevelSelect';
import { GameBoard } from './GameBoard';
import { useTetrisView } from './useTetrisView';
import { useTetrisController } from '../controller';

import './Tetris.css';

export const Tetris = () => {
  const { palette } = useTheme();
  const { GameStates, gameState, setGameState } = useTetrisView();
  const { board, startGame, stats, isGameOver } = useTetrisController();

  React.useEffect(() => {
    if (gameState !== GameStates.PLAYING) return;

    if (isGameOver) {
      setGameState(GameStates.GAME_OVER);
    }
  }, [gameState, isGameOver, setGameState, GameStates]);

  const handleOnShowLevelSelect = () => {
    setGameState(GameStates.LEVEL_SELECT);
  };

  const handleOnStartGame = level => {
    startGame(level);

    setGameState(GameStates.PLAYING);
  };

  return (
    <Box
      pt={6}
      sx={{
        background: palette.bg.grey,
        minHeight: '500px',
        overflowY: 'inherit',
        height: '100vh',
      }}
    >
      {gameState === GameStates.LEVEL_SELECT && (
        <LevelSelect handleOnStartGame={handleOnStartGame} />
      )}

      {gameState === GameStates.PLAYING && (
        <GameBoard board={board} stats={stats} />
      )}

      {gameState === GameStates.GAME_OVER && (
        <GameOver
          stats={stats}
          handleOnShowLevelSelect={handleOnShowLevelSelect}
        />
      )}
    </Box>
  );
};
