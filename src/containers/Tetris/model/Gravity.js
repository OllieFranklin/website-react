export class Gravity {
  constructor() {
    this.counter = 0;

    // default value is level 0 drop speed
    this.withLevel(0);
  }

  withLevel(level) {
    if (level === 0) this.framesPerCell = 48;
    else if (level === 1) this.framesPerCell = 43;
    else if (level === 2) this.framesPerCell = 38;
    else if (level === 3) this.framesPerCell = 33;
    else if (level === 4) this.framesPerCell = 28;
    else if (level === 5) this.framesPerCell = 23;
    else if (level === 6) this.framesPerCell = 18;
    else if (level === 7) this.framesPerCell = 13;
    else if (level === 8) this.framesPerCell = 8;
    else if (level === 9) this.framesPerCell = 6;
    else if (level <= 12) this.framesPerCell = 5;
    else if (level <= 15) this.framesPerCell = 4;
    else if (level <= 18) this.framesPerCell = 3;
    else if (level <= 28) this.framesPerCell = 2;
    else this.framesPerCell = 1;

    return this;
  }

  withSpeed(framesPerCell) {
    this.framesPerCell = framesPerCell;

    return this;
  }

  isDropping() {
    this.counter++;

    if (this.counter >= this.framesPerCell) {
      this.counter = 0;
      return true;
    }

    return false;
  }

  setCounter(value) {
    this.counter = value;
  }
}
