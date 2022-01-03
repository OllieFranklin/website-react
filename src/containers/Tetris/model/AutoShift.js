import { MoveLeft, MoveRight } from './Move';

export class AutoShift {
  constructor() {
    this.Direction = {
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };

    this.isEnabled = false;
    this.counter = 0;
  }

  getNextMove() {
    if (!this.isEnabled) return null;

    this.counter++;

    if (this.counter < 16) return null;

    this.counter = 10;
    return this.direction === this.Direction.LEFT
      ? new MoveLeft()
      : new MoveRight();
  }

  startMovingLeft() {
    this.isEnabled = true;
    this.direction = this.Direction.LEFT;
    this.counter = 0;
  }

  startMovingRight() {
    this.isEnabled = true;
    this.direction = this.Direction.RIGHT;
    this.counter = 0;
  }

  disable() {
    this.isEnabled = false;
  }
}
