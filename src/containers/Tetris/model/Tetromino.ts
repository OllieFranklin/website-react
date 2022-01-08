import { Orientation } from './Orientation';
import { TETROMINO_INIT_ROW, TETROMINO_INIT_COL } from './constants';

export abstract class Tetromino {
  protected orientations: Orientation[];
  protected orientationIndex: number;
  protected orientation: Orientation;
  protected row: number;
  protected col: number;
  protected letter: string;
  protected state!: string[][];

  protected constructor(letter: string) {
    this.letter = letter;
    this.orientations = [];
    this.initOrientations();
    this.orientationIndex = 0;
    this.orientation = this.orientations[this.orientationIndex];
    this.row = TETROMINO_INIT_ROW;
    this.col = TETROMINO_INIT_COL;

    /**
     * State represents the shape of a tetromino, as a String[][]
     * This value is exposed to model/view for next piece
     * e.g. [["T", "T", "T"], [" ", "T", " "]]
     */
    this.initState();
  }

  protected abstract initOrientations(): void;

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

    for (let i = 0; i < this.orientation.cellOffsets.length; i++) {
      const cellOffset = this.orientation.cellOffsets[i];

      if (cellOffset.getX() < minX) minX = cellOffset.getX();
      if (cellOffset.getX() > maxX) maxX = cellOffset.getX();
      if (cellOffset.getY() < minY) minY = cellOffset.getY();
      if (cellOffset.getY() > maxY) maxY = cellOffset.getY();
    }

    // construct an array of the appropriate size
    const rows = maxY - minY + 1;
    const cols = maxX - minX + 1;
    this.state = Array.from(Array(rows), () => Array(cols).fill(' '));

    // put the letters into their spots
    for (let i = 0; i < this.orientation.cellOffsets.length; i++) {
      const cellOffset = this.orientation.cellOffsets[i];

      this.state[rows - (cellOffset.getY() - minY + 1)][
        cellOffset.getX() - minX
      ] = this.letter;
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

  public getRow(): number {
    return this.row;
  }

  public getCol(): number {
    return this.col;
  }

  public getLetter(): string {
    return this.letter;
  }

  public getState(): string[][] {
    return this.state;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }
}

export class I_Tetromino extends Tetromino {
  public constructor() {
    super('I');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(-2, 0, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 0, 0, 0, 1, 0, 2));
  }
}

export class J_Tetromino extends Tetromino {
  public constructor() {
    super('J');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(1, -1, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 0, 0, 0, 1, 1, 1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, -1, 1));
    this.orientations.push(new Orientation(-1, -1, 0, -1, 0, 0, 0, 1));
  }
}

export class L_Tetromino extends Tetromino {
  public constructor() {
    super('L');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(-1, -1, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 1, -1, 0, 0, 0, 1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 1, 1));
    this.orientations.push(new Orientation(0, -1, 0, 0, -1, 1, 0, 1));
  }
}

export class O_Tetromino extends Tetromino {
  public constructor() {
    super('O');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, -1, -1, 0, -1));
  }
}

export class S_Tetromino extends Tetromino {
  public constructor() {
    super('S');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(0, 0, 1, 0, -1, -1, 0, -1));
    this.orientations.push(new Orientation(0, 1, 0, 0, 1, 0, 1, -1));
  }
}

export class T_Tetromino extends Tetromino {
  public constructor() {
    super('T');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 0, -1));
    this.orientations.push(new Orientation(0, 1, 0, 0, 1, 0, 0, -1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 0, 1));
    this.orientations.push(new Orientation(0, 1, -1, 0, 0, 0, 0, -1));
  }
}

export class Z_Tetromino extends Tetromino {
  public constructor() {
    super('Z');
  }

  protected initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, 0, -1, 1, -1));
    this.orientations.push(new Orientation(1, 1, 0, 0, 1, 0, 0, -1));
  }
}
