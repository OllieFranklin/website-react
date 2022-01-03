export class GameState {
  constructor(
    isGameOver,
    board,
    nextPiece,
    level,
    lines,
    score,
    tetrisRate,
    drought,
    burn,
  ) {
    this.isGameOver = isGameOver;

    /**
     * String[][], where each string is the letter
     * corresponding to a tetromino shape (e.g. "T", "L", etc.).
     * The string " " respresents an empty cell
     */
    this.board = board;

    /**
     * Takes the same format as this.board, representing the shape of
     * a tetromino in its initial orientation (will be either a 3x2 or
     * 4x1 String[][])
     * e.g. [ ["L", "L", "L"],
     *        ["L", " ", " "] ]
     */
    this.nextPiece = nextPiece;

    this.level = level;

    this.lines = lines;

    this.score = score;

    this.tetrisRate = tetrisRate;

    this.drought = drought;

    this.burn = burn;
  }
}
