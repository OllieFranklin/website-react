import React from 'react';

enum GameStates {
  LEVEL_SELECT,
  PLAYING,
  GAME_OVER,
}

export const useTetrisView = () => {
  const [gameState, setGameState] = React.useState(GameStates.LEVEL_SELECT);

  return { GameStates, gameState, setGameState };
};
