export const BOARD_ROWS = 22;
export const BOARD_VISIBLE_ROWS = 20;
export const BOARD_COLS = 10;
export const TETROMINO_INIT_ROW = 19;
export const TETROMINO_INIT_COL = 5;

export type TetrominoLetter = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type BoardLetter = TetrominoLetter | ' ';

export type KeyState = {
  down: boolean;
  left: boolean;
  right: boolean;
  rotateCW: boolean;
  rotateACW: boolean;
};

export type Statistics = {
  level: number;
  lines: number;
  score: number;
  tetrisRate: number;
  drought: number;
  burn: number;
  /**
   * Represents a tetromino in its initial orientation
   * as either a 3x2 or 4x1 array
   * e.g. [ ["L", "L", "L"],
   *        ["L", " ", " "] ]
   */
  nextPiece: BoardLetter[][];
};

export type GameState = Statistics & {
  isGameOver: boolean;
  board: BoardLetter[][];
};
