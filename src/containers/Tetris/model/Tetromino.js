import { Orientation } from './Orientation';
import { TETROMINO_INIT_ROW, TETROMINO_INIT_COL } from './constants';

export class Tetromino {
  constructor() {
    if (this.constructor === Tetromino) {
      throw new Error("Can't instantiate abstract class Tetromino");
    }

    this.orientations = [];
    this.initOrientations();
    this.orientationIndex = 0;
    this.orientation = this.orientations[this.orientationIndex];
    this.row = TETROMINO_INIT_ROW;
    this.col = TETROMINO_INIT_COL;
    this.letter = this.constructor.name.charAt(0);

    /**
     * State represents the shape of a tetromino, as a String[][]
     * This value is exposed to model/view for next piece
     * e.g. [["T", "T", "T"], [" ", "T", " "]]
     */
    this.initState();
  }

  initOrientations() {
    throw new Error("Method 'initOrientations()' must be implemented");
  }

  /**
   * A horrible method to convert a tetromino to string form...
   * State represents the shape of a tetromino, as a String[][]
   * This value is exposed to model/view for next piece
   * e.g. [["T", "T", "T"], [" ", "T", " "]]
   * To do this, we must convert from an orientation to a regular array,
   * which turns out to be pretty yucky
   */
  initState() {
    // find the furthest left/right/up/down cells in the orientation
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < this.orientation.cellOffsets.length; i++) {
      const cellOffset = this.orientation.cellOffsets[i];

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
    for (let i = 0; i < this.orientation.cellOffsets.length; i++) {
      const cellOffset = this.orientation.cellOffsets[i];

      this.state[rows - (cellOffset.y - minY + 1)][cellOffset.x - minX] =
        this.letter;
    }
  }

  rotateClockwise() {
    this.orientationIndex--;

    if (this.orientationIndex < 0)
      this.orientationIndex = this.orientations.length - 1;

    this.orientation = this.orientations[this.orientationIndex];
  }

  rotateAntiClockwise() {
    this.orientationIndex++;

    if (this.orientationIndex >= this.orientations.length)
      this.orientationIndex = 0;

    this.orientation = this.orientations[this.orientationIndex];
  }

  setPos(row, col) {
    this.row = row;
    this.col = col;
  }

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }

  getLetter() {
    return this.letter;
  }

  getState() {
    return this.state;
  }
}

export class I_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(-2, 0, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 0, 0, 0, 1, 0, 2));
  }
}

export class J_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(1, -1, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 0, 0, 0, 1, 1, 1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, -1, 1));
    this.orientations.push(new Orientation(-1, -1, 0, -1, 0, 0, 0, 1));
  }
}

export class L_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(-1, -1, -1, 0, 0, 0, 1, 0));
    this.orientations.push(new Orientation(0, -1, 1, -1, 0, 0, 0, 1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 1, 1));
    this.orientations.push(new Orientation(0, -1, 0, 0, -1, 1, 0, 1));
  }
}

export class O_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, -1, -1, 0, -1));
  }
}

export class S_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(0, 0, 1, 0, -1, -1, 0, -1));
    this.orientations.push(new Orientation(0, 1, 0, 0, 1, 0, 1, -1));
  }
}

export class T_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 0, -1));
    this.orientations.push(new Orientation(0, 1, 0, 0, 1, 0, 0, -1));
    this.orientations.push(new Orientation(-1, 0, 0, 0, 1, 0, 0, 1));
    this.orientations.push(new Orientation(0, 1, -1, 0, 0, 0, 0, -1));
  }
}

export class Z_Tetromino extends Tetromino {
  initOrientations() {
    this.orientations.push(new Orientation(-1, 0, 0, 0, 0, -1, 1, -1));
    this.orientations.push(new Orientation(1, 1, 0, 0, 1, 0, 0, -1));
  }
}
