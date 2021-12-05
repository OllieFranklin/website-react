import React from 'react';

export const useTetrisHook = () => {
  const GameStates = {
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER',
  };

  const [gameState, setGameState] = React.useState(GameStates.PLAYING);

  return { GameStates, gameState, setGameState };
};
