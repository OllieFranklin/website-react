import React from 'react';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

import { GameOver } from './GameOver';
import { LevelSelect } from './LevelSelect';
import { GameBoardWithStats } from './GameBoardWithStats';
import { useTetrisView } from './useTetrisView';
import { useTetrisController } from '../controller';

type TetrisProps = {};

const Tetris: React.FC<TetrisProps> = props => {
  const { palette } = useTheme();
  const { GameStates, gameState, setGameState } = useTetrisView();
  const {
    boardRef,
    nextPieceRef,
    startGame,
    stats,
    isGameOver,
    togglePlayPause,
  } = useTetrisController();

  const handleOnShowLevelSelect = () => {
    setGameState(GameStates.LEVEL_SELECT);
  };

  const handleOnStartGame = (level: number) => {
    startGame(level);

    setGameState(GameStates.PLAYING);
  };

  React.useEffect(() => {
    if (gameState === GameStates.PLAYING && isGameOver) {
      setGameState(GameStates.GAME_OVER);
    }
  }, [gameState, isGameOver, setGameState, GameStates]);

  return (
    <Box
      sx={{
        pt: 6,
        background: palette.bg.grey,
        minHeight: '500px',
        overflowY: 'inherit',
        height: '100vh',
      }}
    >
      {gameState === GameStates.LEVEL_SELECT && (
        <LevelSelect handleOnStartGame={handleOnStartGame} />
      )}

      {gameState === GameStates.PLAYING && stats?.type === 'inGame' && (
        <GameBoardWithStats
          boardRef={boardRef}
          nextPieceRef={nextPieceRef}
          stats={stats.value}
          togglePlayPause={togglePlayPause}
        />
      )}

      {gameState === GameStates.GAME_OVER && stats?.type === 'gameOver' && (
        <GameOver
          stats={stats.value}
          handleOnShowLevelSelect={handleOnShowLevelSelect}
        />
      )}
    </Box>
  );
};

export { Tetris };
