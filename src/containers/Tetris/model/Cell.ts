export class Cell {
  public isOccupied: boolean;
  public isActiveTetromino: boolean;
  private tetrominoLetter: string;

  public constructor() {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';
  }

  public occupy(tetrominoLetter: string): void {
    this.isOccupied = true;
    this.tetrominoLetter = tetrominoLetter;
  }

  public clear(): void {
    this.isOccupied = false;
    this.isActiveTetromino = false;
    this.tetrominoLetter = ' ';
  }

  public toString(): string {
    return this.isOccupied ? this.tetrominoLetter : ' ';
  }
}
