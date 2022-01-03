import { Point } from './Point';

export class Orientation {
  constructor() {
    if (arguments.length % 2 !== 0)
      throw new Error('Orientation must recieve an even number of arguments');

    this.cellOffsets = [];

    for (let i = 0; i < arguments.length; i += 2) {
      this.cellOffsets.push(new Point(arguments[i], arguments[i + 1]));
    }
  }
}
