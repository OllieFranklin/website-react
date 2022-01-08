import {
  TETROMINO_TYPES,
  TETROMINO_INIT_COL,
  TETROMINO_INIT_ROW,
  VISIBLE_ROWS,
  ROWS,
  COLS,
} from './constants';
import { Cell } from './Cell';
import {
  Tetromino,
  I_Tetromino,
  J_Tetromino,
  L_Tetromino,
  O_Tetromino,
  S_Tetromino,
  T_Tetromino,
  Z_Tetromino,
} from './Tetromino';

const tetrominos = [
  I_Tetromino,
  J_Tetromino,
  L_Tetromino,
  O_Tetromino,
  S_Tetromino,
  T_Tetromino,
  Z_Tetromino,
];

export class Board {
  public activeTetromino!: Tetromino;
  public nextTetromino!: Tetromino;

  private cells: Cell[][];
  private numRowsToMoveBy: number[];
  private linesToClear: number[];

  public constructor() {
    this.cells = new Array(ROWS);

    this.newActiveTetromino();

    this.numRowsToMoveBy = [];
    this.linesToClear = [];

    for (let row = 0; row < ROWS; row++) {
      this.cells[row] = new Array(COLS);
      for (let col = 0; col < COLS; col++) {
        this.cells[row][col] = new Cell();
      }
    }
  }

  public pieceLock(): void {
    for (let i = 0; i < this.activeTetromino.orientation.length; i++) {
      const cellOffset = this.activeTetromino.orientation[i];
      const row = this.activeTetromino.row + cellOffset.y;
      const col = this.activeTetromino.col + cellOffset.x;
      this.cells[row][col].isActiveTetromino = false;
    }
  }

  public findLinesToClear(): number {
    this.numRowsToMoveBy = [];
    this.linesToClear = [];

    // figure out which rows need to be cleared and by how many rows each row needs to move down
    for (let row = 0; row < ROWS; row++) {
      let lineIsFilled = true;
      for (let col = 0; col < COLS; col++) {
        if (!this.cells[row][col].isOccupied) {
          lineIsFilled = false;
          break;
        }
      }

      this.numRowsToMoveBy[row] = this.linesToClear.length;
      if (lineIsFilled) {
        this.linesToClear.push(row);
      }
    }

    return this.linesToClear.length;
  }

  public clearLines(columnIndex: number): void {
    for (let i = 0; i < this.linesToClear.length; i++) {
      const row = this.linesToClear[i];

      const col1 = Math.floor(COLS / 2) - 1 - columnIndex;
      const col2 = Math.floor(COLS / 2) + columnIndex;
      this.cells[row][col1].clear();
      this.cells[row][col2].clear();
    }
  }

  public moveLinesDown(): void {
    for (let row = 1; row < ROWS; row++) {
      const numRows = this.numRowsToMoveBy[row];
      if (numRows === 0) continue;

      for (let col = 0; col < COLS; col++) {
        const cell = this.cells[row][col];

        if (cell.isOccupied)
          this.cells[row - numRows][col].occupy(cell.tetrominoLetter);
        else this.cells[row - numRows][col].clear();

        this.cells[row][col].clear();
      }
    }
  }

  public newActiveTetromino(): boolean {
    this.activeTetromino = this.nextTetromino;

    const randomIndex = Math.floor(Math.random() * TETROMINO_TYPES.length);

    this.nextTetromino = tetrominos[randomIndex];
    this.nextTetromino.reset();

    if (!this.activeTetromino) {
      return false;
    }

    if (this.canPlaceActiveTetromino(TETROMINO_INIT_ROW, TETROMINO_INIT_COL)) {
      this.placeActiveTetromino(TETROMINO_INIT_ROW, TETROMINO_INIT_COL);
      return true;
    }

    return false;
  }

  public canPlaceActiveTetromino(row: number, col: number): boolean {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) {
      return false;
    }

    for (let i = 0; i < this.activeTetromino.orientation.length; i++) {
      const cellOffset = this.activeTetromino.orientation[i];

      try {
        const cell = this.cells[row + cellOffset.y][col + cellOffset.x];

        if (cell.isOccupied && !cell.isActiveTetromino) return false;
      } catch (error) {
        return false;
      }
    }

    return true;
  }

  public placeActiveTetromino(row: number, col: number): void {
    if (row < 0 || col < 0 || row >= ROWS || col >= COLS) {
      throw new Error('Out of bounds value for tetromino position');
    }

    this.activeTetromino.setPos(row, col);
    for (let i = 0; i < this.activeTetromino.orientation.length; i++) {
      const cellOffset = this.activeTetromino.orientation[i];
      const cell = this.cells[row + cellOffset.y][col + cellOffset.x];

      cell.occupy(this.activeTetromino.letter);
      cell.isActiveTetromino = true;
    }
  }

  public clearActiveTetromino(): void {
    for (let i = 0; i < this.activeTetromino.orientation.length; i++) {
      const cellOffset = this.activeTetromino.orientation[i];
      const row = this.activeTetromino.row + cellOffset.y;
      const col = this.activeTetromino.col + cellOffset.x;
      const cell = this.cells[row][col];

      cell.clear();
    }
  }

  public getNumLinesCleared(): number {
    return this.linesToClear.length;
  }

  public getState(): string[][] {
    const state = new Array<string[]>(VISIBLE_ROWS);

    for (let row = 0; row < VISIBLE_ROWS; row++) {
      state[row] = new Array<string>(COLS);
      for (let col = 0; col < COLS; col++) {
        state[row][col] =
          this.cells[VISIBLE_ROWS - (row + 1)][col].tetrominoLetter;
      }
    }

    return state;
  }
}
