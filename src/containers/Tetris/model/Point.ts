export class Point {
  private x: number;
  private y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }
}
