import { Board } from './Board';

export type Move = (board: Board) => boolean;

export const MoveDown: Move = (board: Board) => {
  const tetromino = board.getActiveTetromino();
  const newRow = tetromino.getRow() - 1;

  if (board.canPlaceActiveTetromino(newRow, tetromino.getCol())) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(newRow, tetromino.getCol());
    return true;
  }

  return false;
};

export const MoveLeft: Move = (board: Board) => {
  const tetromino = board.getActiveTetromino();
  const newCol = tetromino.getCol() - 1;

  if (board.canPlaceActiveTetromino(tetromino.getRow(), newCol)) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(tetromino.getRow(), newCol);
    return true;
  }

  return false;
};

export const MoveRight: Move = (board: Board) => {
  const tetromino = board.getActiveTetromino();
  const newCol = tetromino.getCol() + 1;

  if (board.canPlaceActiveTetromino(tetromino.getRow(), newCol)) {
    board.clearActiveTetromino();
    board.placeActiveTetromino(tetromino.getRow(), newCol);
    return true;
  }

  return false;
};

export const RotateCW: Move = (board: Board) => {
  return rotate(board, true);
};

export const RotateACW: Move = (board: Board) => {
  return rotate(board, false);
};

function rotate(board: Board, isClockwise: boolean): boolean {
  const tetromino = board.getActiveTetromino();

  // remove active tetromino from board, then update its orientation
  board.clearActiveTetromino();
  isClockwise ? tetromino.rotateClockwise() : tetromino.rotateAntiClockwise();

  // if tetromino can be placed in new orientation, place it and return true
  if (board.canPlaceActiveTetromino(tetromino.getRow(), tetromino.getCol())) {
    board.placeActiveTetromino(tetromino.getRow(), tetromino.getCol());
    return true;
  }

  // otherwise, revert orientation and place back MoveDown
  isClockwise ? tetromino.rotateAntiClockwise() : tetromino.rotateClockwise();
  board.placeActiveTetromino(tetromino.getRow(), tetromino.getCol());

  return false;
}
