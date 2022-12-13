import { Board } from './Board';

export type Move = (board: Board) => boolean;

export const MoveDown: Move = (board: Board) => {
  const tetromino = board.activeTetromino;
  const newRow = tetromino.row - 1;

  if (board.canPlaceActiveTetromino(newRow, tetromino.col)) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(newRow, tetromino.col);
    return true;
  }

  return false;
};

export const MoveLeft: Move = (board: Board) => {
  const tetromino = board.activeTetromino;
  const newCol = tetromino.col - 1;

  if (board.canPlaceActiveTetromino(tetromino.row, newCol)) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(tetromino.row, newCol);
    return true;
  }

  return false;
};

export const MoveRight: Move = (board: Board) => {
  const tetromino = board.activeTetromino;
  const newCol = tetromino.col + 1;

  if (board.canPlaceActiveTetromino(tetromino.row, newCol)) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(tetromino.row, newCol);
    return true;
  }

  return false;
};

export const RotateCW: Move = (board: Board) => rotate(board, true);

export const RotateACW: Move = (board: Board) => rotate(board, false);

function rotate(board: Board, isClockwise: boolean): boolean {
  const tetromino = board.activeTetromino;

  // remove active tetromino from board, then update its orientation
  board.clearActiveTetromino();
  isClockwise ? tetromino.rotateClockwise() : tetromino.rotateAntiClockwise();

  // if tetromino can be placed in new orientation, place it and return true
  if (board.canPlaceActiveTetromino(tetromino.row, tetromino.col)) {
    board.placeActiveTetromino(tetromino.row, tetromino.col);
    return true;
  }

  // otherwise, revert orientation and place back MoveDown
  isClockwise ? tetromino.rotateAntiClockwise() : tetromino.rotateClockwise();
  board.placeActiveTetromino(tetromino.row, tetromino.col);

  return false;
}
