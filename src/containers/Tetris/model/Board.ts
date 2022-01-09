import {
  TETROMINO_TYPES,
  TETROMINO_INIT_COL,
  TETROMINO_INIT_ROW,
  VISIBLE_ROWS,
  ROWS,
  COLS,
} from './constants';
import { Cell } from './Cell';
import { Tetromino } from './Tetromino';
import {
  I_TetrominoData,
  J_TetrominoData,
  L_TetrominoData,
  O_TetrominoData,
  S_TetrominoData,
  T_TetrominoData,
  Z_TetrominoData,
} from './TetrominoData';

const tetrominoData = [
  I_TetrominoData,
  J_TetrominoData,
  L_TetrominoData,
  O_TetrominoData,
  S_TetrominoData,
  T_TetrominoData,
  Z_TetrominoData,
];

const tetrominoDataObject = {
  [I_TetrominoData.letter]: I_TetrominoData,
  [J_TetrominoData.letter]: J_TetrominoData,
  [L_TetrominoData.letter]: L_TetrominoData,
  [O_TetrominoData.letter]: O_TetrominoData,
  [S_TetrominoData.letter]: S_TetrominoData,
  [T_TetrominoData.letter]: T_TetrominoData,
  [Z_TetrominoData.letter]: Z_TetrominoData,
};

export class Board {
  public activeTetromino!: Tetromino;
  public nextTetromino!: Tetromino;

  private cells: Cell[][];
  private numRowsToMoveBy: number[];
  private linesToClear: number[];

  /**
   * Used for automated testing. Allows a predefined piece order to be used
   * instead of a random piece each time
   */
  private pieceOrder: string[] | undefined;
  private pieceIndex: number;

  public constructor(pieceOrder?: string[]) {
    this.pieceOrder = pieceOrder;
    this.pieceIndex = 0;

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
    for (const cellOffset of this.activeTetromino.orientation) {
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
    for (const row of this.linesToClear) {
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

    if (this.pieceOrder) {
      const index = Math.min(this.pieceIndex++, this.pieceOrder.length - 1);
      const data = tetrominoDataObject[this.pieceOrder[index]];
      this.nextTetromino = new Tetromino(data);
    } else {
      const randomIndex = Math.floor(Math.random() * TETROMINO_TYPES.length);
      this.nextTetromino = new Tetromino(tetrominoData[randomIndex]);
    }

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

    for (const cellOffset of this.activeTetromino.orientation) {
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
    for (const cellOffset of this.activeTetromino.orientation) {
      const cell = this.cells[row + cellOffset.y][col + cellOffset.x];

      cell.occupy(this.activeTetromino.letter);
      cell.isActiveTetromino = true;
    }
  }

  public clearActiveTetromino(): void {
    for (const cellOffset of this.activeTetromino.orientation) {
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
