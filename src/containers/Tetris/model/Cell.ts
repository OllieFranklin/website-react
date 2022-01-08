import { CELL_SIZE, VISIBLE_ROWS } from './constants';

export class Cell {
  isOccupied: boolean;
  isActiveTetromino: boolean;
  tetrominoLetter: string;
  x: number;
  y: number;

  constructor(row: number, col: number) {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';

    this.x = col * CELL_SIZE;
    this.y = CELL_SIZE * VISIBLE_ROWS - CELL_SIZE * (row + 1);
  }

  occupy(tetrominoLetter: string): void {
    this.isOccupied = true;
    this.tetrominoLetter = tetrominoLetter;
  }

  clear(): void {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';
  }

  toString(): string {
    return this.isOccupied ? this.tetrominoLetter : ' ';
  }
}
