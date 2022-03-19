import React from 'react';

export const useTetrisView = () => {
  const GameStates = {
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER',
  };

  const [gameState, setGameState] = React.useState(GameStates.LEVEL_SELECT);

  return { GameStates, gameState, setGameState };
};
