import { Game, GameState } from '../';
import testOutput from '../../test-output.json';

function gameStateBoardToJsonFileBoard(board: string[][]) {
  let output = '';
  for (const row of board) {
    for (const cell of row) {
      if (cell === ' ') {
        output += '0';
      } else {
        output += '1';
      }
    }
    output += '\n';
  }

  return output;
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
