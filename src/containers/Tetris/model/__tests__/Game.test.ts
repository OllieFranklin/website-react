import { Game, KeyState } from '..';
import testOracles from './test_oracles';

const numPrevBoards = 0;

function gameStateBoardToJsonFileBoard(board: string[][]): string {
  return board
    .map(row => row.map(cell => (cell === ' ' ? '0' : '1')).join('') + '\n')
    .join('');
}

function boardToPrintableArray(board: string): string[] {
  const arr = board.split('\n').map((rowString, row) =>
    rowString
      .split('')
      .map((char, col) =>
        char === '0' ? (row % 2 !== col % 2 ? '  ' : '░░') : '██',
      )
      .join(''),
  );
  arr.pop();

  return arr.map((row, index) => `${String.fromCharCode(65 + index)} ${row}`);
}

function keyStateToPrintableArray(keyState: KeyState): string[] {
  return `
             uuu                 
           uuuuuuu                  aaa  
           uuuuuuu                aaaaaaa  
                                    aaa   
    lllll           rrrrr               A 
  lllllll           rrrrrrr          
    lllll           rrrrr           
                                    bbb      
           ddddddd                bbbbbbb          
           ddddddd                  bbb  
             ddd                        B
`
    .replaceAll('u', '▒')
    .replaceAll('d', keyState.down ? '█' : '▒')
    .replaceAll('l', keyState.left ? '█' : '▒')
    .replaceAll('r', keyState.right ? '█' : '▒')
    .replaceAll('a', keyState.rotateCW ? '█' : '▒')
    .replaceAll('b', keyState.rotateACW ? '█' : '▒')
    .split('\n');
}

function getCustomFailureMessage(
  expected: string,
  recieved: string,
  { frameNum, prevBoards, keyState }: info,
): string {
  let errorString = '';

  for (const { frame, board } of prevBoards) {
    errorString += `Frame ${frame}\n`;
    errorString += boardToPrintableArray(board).join('\n');
    errorString += '\n\n';
  }

  errorString += `Mismatch found on frame ${frameNum}\n\nExpected (frame ${frameNum})     Recieved (frame ${frameNum})\n`;
  const expectedArray = boardToPrintableArray(expected);
  const recievedArray = boardToPrintableArray(recieved);
  const keyStateArray = keyStateToPrintableArray(keyState);
  for (let i = 0; i < expectedArray.length; i++) {
    errorString += `${expectedArray[i]}   ${recievedArray[i]}         ${
      keyStateArray[i - 3] || ''
    }\n`;
  }

  return errorString;
}

type info = {
  frameNum: number;
  prevBoards: { frame: number; board: string }[];
  keyState: KeyState;
};

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
        message: () => 'Passed',
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

testOracles.forEach(
  ({ data: { pieceOrder, startingLevel, frames }, fileName, description }) => {
    test(`${description}`, () => {
      const game = new Game(startingLevel, pieceOrder);

      let recievedFrameNum = 0;
      const prevBoards = [];

      for (let i = 0; i < frames.length; i++) {
        const { boardState: expectedBoard, keyState } = frames[i];
        const { frameNum: nextExpectedFrameNum = -1 } = frames[i + 1] || {};

        while (recievedFrameNum < nextExpectedFrameNum) {
          const gameState = game.nextFrame(keyState);
          const recievedBoard = gameStateBoardToJsonFileBoard(gameState.board);

          const info = { frameNum: recievedFrameNum, prevBoards, keyState };
          expect(expectedBoard).toMatchBoard(recievedBoard, info);

          recievedFrameNum++;
        }

        prevBoards.push({ frame: recievedFrameNum, board: expectedBoard });
        if (prevBoards.length > numPrevBoards) {
          prevBoards.shift();
        }
      }
    });
  },
);
