import { Game } from '../';
import testOutput from '../../test-output.json';

function gameStateBoardToJsonFileBoard(board: string[][]): string {
  return board
    .map(row => row.map(cell => (cell === ' ' ? '0' : '1')).join('') + '\n')
    .join('');
}

test('First frames are the same', () => {
  const { pieceOrder, startingLevel, frames } = testOutput;

  const game = new Game(startingLevel, pieceOrder);

  const frame = frames[0];

  const { keyState, boardState: expectedBoard } = frame;

  const gameState = game.nextFrame(keyState);
  const actualBoard = gameStateBoardToJsonFileBoard(gameState.board);

  expect(actualBoard).toBe(expectedBoard);
});
