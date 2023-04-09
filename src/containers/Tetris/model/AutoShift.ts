import { MoveLeft, MoveRight, Move } from './Move';

enum Direction {
  LEFT,
  RIGHT,
  DISABLED,
}

export class AutoShift {
  private counter: number;
  private direction: Direction;

  public constructor() {
    this.counter = 0;
    this.direction = Direction.DISABLED;
  }

  public step(onMove: null | ((m: Move) => void)): void {
    if (this.direction === Direction.DISABLED) return;

    this.counter++;
    if (onMove === null) return;

    if (this.counter < 17) return;

    this.counter = 11;
    this.direction === Direction.LEFT ? onMove(MoveLeft) : onMove(MoveRight);
  }

  public startMovingLeft(): void {
    this.direction = Direction.LEFT;
    this.counter = 0;
  }

  public startMovingRight(): void {
    this.direction = Direction.RIGHT;
    this.counter = 0;
  }

  public disable(): void {
    this.direction = Direction.DISABLED;
  }

  public moveNextFrame(): void {
    this.counter = 14;
  }
}
