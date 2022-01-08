export type GameState = {
  isGameOver: boolean;

  /**
   * String[][], where each string is the letter
   * corresponding to a tetromino shape (e.g. "T", "L", etc.).
   * The string " " respresents an empty cell
   */
  board: string[][];

  /**
   * Takes the same format as this.board, representing the shape of
   * a tetromino in its initial orientation (will be either a 3x2 or
   * 4x1 String[][])
   * e.g. [ ["L", "L", "L"],
   *        ["L", " ", " "] ]
   */
  nextPiece: string[][];

  /**
   * Statistics
   */
  level: number;
  lines: number;
  score: number;
  tetrisRate: number;
  drought: number;
  burn: number;
};
