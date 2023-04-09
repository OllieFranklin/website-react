import React from 'react';

enum GameStates {
  LEVEL_SELECT,
  PLAYING,
  GAME_OVER,
}

export const useTetrisView = () => {
  console.log(process.env.REACT_APP_FEATURE_FLAGS);

  const [gameState, setGameState] = React.useState(GameStates.LEVEL_SELECT);

  return { GameStates, gameState, setGameState };
};
