import { BoardLetter } from './constants';

export class Cell {
  public isOccupied: boolean;
  public isActiveTetromino: boolean;
  public tetrominoLetter: BoardLetter;

  public constructor() {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';
  }

  public occupy(tetrominoLetter: BoardLetter): void {
    this.isOccupied = true;
    this.tetrominoLetter = tetrominoLetter;
  }

  public clear(): void {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';
  }
}
