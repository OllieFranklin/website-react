import {
  TETROMINO_INIT_ROW,
  TETROMINO_INIT_COL,
  TetrominoLetter,
  BoardLetter,
} from './constants';
import { Orientation, TetrominoData } from './TetrominoData';

export class Tetromino {
  public row: number;
  public col: number;
  public letter: TetrominoLetter;
  public state!: BoardLetter[][];
  public orientation: Orientation;

  private orientations: Orientation[];
  private orientationIndex: number;

  public constructor({ letter, orientations }: TetrominoData) {
    this.letter = letter;
    this.orientations = orientations;

    this.orientationIndex = 0;
    this.orientation = this.orientations[0];
    this.row = TETROMINO_INIT_ROW;
    this.col = TETROMINO_INIT_COL;

    /**
     * State represents the shape of a tetromino, as a String[][]
     * This value is exposed to model/view for next piece
     * e.g. [["T", "T", "T"], [" ", "T", " "]]
     */
    this.initState();
  }

  /**
   * A horrible method to convert a tetromino to string form...
   * State represents the shape of a tetromino, as a String[][]
   * This value is exposed to model/view for next piece
   * e.g. [["T", "T", "T"], [" ", "T", " "]]
   * To do this, we must convert from an orientation to a regular array,
   * which turns out to be pretty yucky
   */
  private initState(): void {
    // find the furthest left/right/up/down cells in the orientation
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const cellOffset of this.orientation) {
      if (cellOffset.x < minX) minX = cellOffset.x;
      if (cellOffset.x > maxX) maxX = cellOffset.x;
      if (cellOffset.y < minY) minY = cellOffset.y;
      if (cellOffset.y > maxY) maxY = cellOffset.y;
    }

    // construct an array of the appropriate size
    const rows = maxY - minY + 1;
    const cols = maxX - minX + 1;
    this.state = Array.from(Array(rows), () => Array(cols).fill(' '));

    // put the letters into their spots
    for (const cellOffset of this.orientation) {
      this.state[rows - (cellOffset.y - minY + 1)][cellOffset.x - minX] =
        this.letter;
    }
  }

  public rotateClockwise(): void {
    this.orientationIndex--;

    if (this.orientationIndex < 0)
      this.orientationIndex = this.orientations.length - 1;

    this.orientation = this.orientations[this.orientationIndex];
  }

  public rotateAntiClockwise(): void {
    this.orientationIndex++;

    if (this.orientationIndex >= this.orientations.length)
      this.orientationIndex = 0;

    this.orientation = this.orientations[this.orientationIndex];
  }

  public setPos(row: number, col: number): void {
    this.row = row;
    this.col = col;
  }
}
