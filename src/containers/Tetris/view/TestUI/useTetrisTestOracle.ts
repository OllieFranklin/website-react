import React from 'react';
import { BoardLetter, Game, TetrominoLetter } from '../../model';

import { testOracles } from '../../model/__tests__/test_oracles';

function useTetrisTestOracle() {
  const testOracleBoardRef = React.useRef<BoardLetter[][]>([]);
  const modelOutputBoardRef = React.useRef<BoardLetter[][]>([]);
  const [frameNum, setFrameNum] = React.useState(0);

  const [testOracleBoards, setTestOracleBoards] = React.useState<
    BoardLetter[][][]
  >([]);
  const [modelOutputBoards, setModelOutputBoards] = React.useState<
    BoardLetter[][][]
  >([]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      switch (key) {
        case 'ArrowLeft':
          setFrameNum(Math.max(frameNum - 1, 0));
          break;
        case 'ArrowRight':
          setFrameNum(Math.min(frameNum + 1, testOracleBoards.length));
          break;
        default:
      }
    },
    [testOracleBoards, frameNum],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  React.useEffect(() => {
    testOracleBoardRef.current = testOracleBoards?.[frameNum] ?? [];
    modelOutputBoardRef.current = modelOutputBoards?.[frameNum] ?? [];
  }, [frameNum, testOracleBoards, modelOutputBoards]);

  React.useEffect(() => {
    const testOracle = testOracles[20];

    const { startingLevel, pieceOrder, frames } = testOracle.data;

    // We don't actually know which tetromino is at each point
    // Just use a T tetromino everywhere
    const newTestOracleBoards = testOracle.data.frames
      .map(frame => frame.boardState)
      .map(boardStateString =>
        boardStateString
          .split('\n')
          .map(row => row.split('').map(char => (char === '1' ? 'T' : ' '))),
      );
    setTestOracleBoards(newTestOracleBoards);

    const game = new Game(startingLevel, pieceOrder as TetrominoLetter[]);
    const newModelOutputBoards = frames.reduce(
      (acc: BoardLetter[][][], val: any) => {
        const gameState = game.nextFrame(val.keyState);

        if (gameState.isGameOver) return acc;

        const board = gameState.board.map(row =>
          row.map(char => (char !== ' ' ? 'T' : char)),
        );
        return [...acc, board];
      },
      [],
    );
    setModelOutputBoards(newModelOutputBoards);
  }, []);

  return { testOracleBoardRef, modelOutputBoardRef, frameNum };
}

export { useTetrisTestOracle };
