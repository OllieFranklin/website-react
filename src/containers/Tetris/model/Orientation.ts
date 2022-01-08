import { Point } from './Point';

export class Orientation {
  public cellOffsets: Point[];

  public constructor(...args: number[]) {
    if (args.length % 2 !== 0)
      throw new Error('Orientation must recieve an even number of arguments');

    this.cellOffsets = [];

    for (let i = 0; i < args.length; i += 2) {
      this.cellOffsets.push(new Point(args[i], args[i + 1]));
    }
  }
}
