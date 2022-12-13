function getFramesForLevel(level: number): number {
  if (level === 0) return 48;
  else if (level === 1) return 43;
  else if (level === 2) return 38;
  else if (level === 3) return 33;
  else if (level === 4) return 28;
  else if (level === 5) return 23;
  else if (level === 6) return 18;
  else if (level === 7) return 13;
  else if (level === 8) return 8;
  else if (level === 9) return 6;
  else if (level <= 12) return 5;
  else if (level <= 15) return 4;
  else if (level <= 18) return 3;
  else if (level <= 28) return 2;

  return 1;
}

type GravityOptions = { speed?: number; level?: number };

export class Gravity {
  public counter: number;
  public framesPerCell: number;

  public constructor(options: GravityOptions) {
    const { level, speed } = options;

    // Cannot have both or neither property undefined
    if ((speed === undefined) === (level === undefined)) {
      throw new Error();
    }

    this.framesPerCell =
      level !== undefined ? getFramesForLevel(level) : speed ?? 0;
    this.counter = 0;
  }

  public isDropping(): boolean {
    this.counter++;

    if (this.counter >= this.framesPerCell) {
      this.counter = 0;
      return true;
    }

    return false;
  }
}
