export class KeyState {
  constructor(down, left, right, rotateCW, rotateACW) {
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotateCW = rotateCW;
    this.rotateACW = rotateACW;
  }

  copy() {
    return new KeyState(
      this.down,
      this.left,
      this.right,
      this.rotateCW,
      this.rotateACW,
    );
  }
}
