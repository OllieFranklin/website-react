import { CELL_SIZE, VISIBLE_ROWS } from './constants';

export class Cell {
  constructor(row, col) {
    this.isOccupied = false;
    this.isActiveTetromino = false;

    this.x = col * CELL_SIZE;
    this.y = CELL_SIZE * VISIBLE_ROWS - CELL_SIZE * (row + 1);
  }

  occupy(tetrominoLetter) {
    this.isOccupied = true;
    this.tetrominoLetter = tetrominoLetter;
  }

  clear() {
    this.isOccupied = false;
    this.isActiveTetromino = false;
  }

  toString() {
    return this.isOccupied ? this.tetrominoLetter : ' ';
  }
}
