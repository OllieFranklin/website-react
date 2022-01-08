import { MoveLeft, MoveRight, Move } from './Move';

enum Direction {
  LEFT,
  RIGHT,
}

export class AutoShift {
  private isEnabled: boolean;
  private counter: number;
  private direction: Direction;

  public constructor() {
    this.isEnabled = false;
    this.counter = 0;
    // initial direction doesn't matter as isEnabled is false
    this.direction = Direction.LEFT;
  }

  public getNextMove(): Move | null {
    if (!this.isEnabled) return null;

    this.counter++;

    if (this.counter < 16) return null;

    this.counter = 10;
    return this.direction === Direction.LEFT ? MoveLeft : MoveRight;
  }

  public startMovingLeft(): void {
    this.isEnabled = true;
    this.direction = Direction.LEFT;
    this.counter = 0;
  }

  public startMovingRight(): void {
    this.isEnabled = true;
    this.direction = Direction.RIGHT;
    this.counter = 0;
  }

  public disable(): void {
    this.isEnabled = false;
  }
}
