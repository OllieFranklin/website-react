import { MoveLeft, MoveRight, Move } from './Move';

enum Direction {
  LEFT,
  RIGHT,
}

export class AutoShift {
  isEnabled: boolean;
  counter: number;
  direction: Direction;

  constructor() {
    this.isEnabled = false;
    this.counter = 0;
    // initial direction doesn't matter as isEnabled is false
    this.direction = Direction.LEFT;
  }

  getNextMove(): Move | null {
    if (!this.isEnabled) return null;

    this.counter++;

    if (this.counter < 16) return null;

    this.counter = 10;
    return this.direction === Direction.LEFT ? new MoveLeft() : new MoveRight();
  }

  startMovingLeft(): void {
    this.isEnabled = true;
    this.direction = Direction.LEFT;
    this.counter = 0;
  }

  startMovingRight(): void {
    this.isEnabled = true;
    this.direction = Direction.RIGHT;
    this.counter = 0;
  }

  disable(): void {
    this.isEnabled = false;
  }
}
