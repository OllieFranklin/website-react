class Move {
  constructor() {
    if (this.constructor === Move) {
      throw new Error("Can't instantiate abstract class Move");
    }
  }

  apply() {
    throw new Error("Method 'apply()' must be implemented");
  }
}

export class MoveDown extends Move {
  apply(board) {
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

export class MoveLeft extends Move {
  apply(board) {
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

export class MoveRight extends Move {
  apply(board) {
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

class Rotation extends Move {
  constructor() {
    super();
    if (this.constructor === Rotation) {
      throw new Error("Can't instantiate abstract class Rotation");
    }
  }

  rotate(board, isClockwise) {
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

export class RotateCW extends Rotation {
  apply(board) {
    return this.rotate(board, true);
  }
}

export class RotateACW extends Rotation {
  apply(board) {
    return this.rotate(board, false);
  }
}
