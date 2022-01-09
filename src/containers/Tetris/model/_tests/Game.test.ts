import { Game } from '../';
import testOutput from '../../test-output.json';

function gameStateBoardToJsonFileBoard(board: string[][]): string {
  return board
    .map(row => row.map(cell => (cell === ' ' ? '0' : '1')).join('') + '\n')
    .join('');
}

function getCustomFailureMessage(
  expected: string,
  recieved: string,
  { frameNum }: info,
): string {
  const boardToPrintableArray = (board: string): string[] => {
    return board.replaceAll('0', '░░').replaceAll('1', '██').split('\n');
  };

  let errorString = `On frame ${frameNum}\n\nExpected board         Recieved board\n`;
  const expectedArray = boardToPrintableArray(expected);
  const recievedArray = boardToPrintableArray(recieved);
  for (let i = 0; i < expectedArray.length; i++) {
    let expectedRow = expectedArray[i];
    let recievedRow = recievedArray[i];

    if (expectedRow !== recievedRow) {
      recievedRow = recievedRow.replaceAll('░', '▒');
    }

    errorString += `${expectedRow}   ${recievedRow}\n`;
  }

  return errorString;
}

type info = { frameNum: number };

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchBoard(recieved: string, info: info): R;
    }
  }
}

expect.extend({
  toMatchBoard(expected: string, received: string, info: info) {
    const pass = expected === received;
    if (pass) {
      return {
        message: () => '',
        pass: true,
      };
    } else {
      return {
        message: () => getCustomFailureMessage(expected, received, info),
        pass: false,
      };
    }
  },
});

test('Model matches test oracle', () => {
  const { pieceOrder, startingLevel, frames } = testOutput;

  const game = new Game(startingLevel, pieceOrder);

  let recievedFrameNum = 0;

  for (let i = 0; i < frames.length; i++) {
    const { boardState: expectedBoard, keyState } = frames[i];
    const { frameNum: nextExpectedFrameNum = -1 } = frames[i + 1] || {};

    while (recievedFrameNum < nextExpectedFrameNum) {
      const gameState = game.nextFrame(keyState);
      const recievedBoard = gameStateBoardToJsonFileBoard(gameState.board);

      const info = { frameNum: recievedFrameNum };
      expect(expectedBoard).toMatchBoard(recievedBoard, info);

      recievedFrameNum++;
    }
  }
});
