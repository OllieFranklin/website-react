import { Board } from './Board';

export interface Move {
  apply(board: Board): boolean;
}

export class MoveDown implements Move {
  apply(board: Board): boolean {
    const tetromino = board.getActiveTetromino();
    const newRow = tetromino.getRow() - 1;

    if (board.canPlaceActiveTetromino(newRow, tetromino.getCol())) {
      board.clearActiveTetromino();
      board.placeActiveTetromino(newRow, tetromino.getCol());
      return true;
    }

    return false;
  }
}

export class MoveLeft implements Move {
  apply(board: Board): boolean {
    const tetromino = board.getActiveTetromino();
    const newCol = tetromino.getCol() - 1;

    if (board.canPlaceActiveTetromino(tetromino.getRow(), newCol)) {
      board.clearActiveTetromino();
      board.placeActiveTetromino(tetromino.getRow(), newCol);
      return true;
    }

    return false;
  }
}

export class MoveRight implements Move {
  apply(board: Board): boolean {
    const tetromino = board.getActiveTetromino();
    const newCol = tetromino.getCol() + 1;

    if (board.canPlaceActiveTetromino(tetromino.getRow(), newCol)) {
      board.clearActiveTetromino();
      board.placeActiveTetromino(tetromino.getRow(), newCol);
      return true;
    }

    return false;
  }
}

class Rotation {
  rotate(board: Board, isClockwise: boolean): boolean {
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
}

export class RotateCW extends Rotation implements Move {
  apply(board: Board): boolean {
    return this.rotate(board, true);
  }
}

export class RotateACW extends Rotation implements Move {
  apply(board: Board): boolean {
    return this.rotate(board, false);
  }
}
