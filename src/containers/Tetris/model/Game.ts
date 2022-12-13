import { AutoShift } from './AutoShift';
import { Board } from './Board';
import { Gravity } from './Gravity';
import { KeyState, GameState, TetrominoLetter } from './constants';
import {
  Move,
  MoveLeft,
  MoveRight,
  RotateACW,
  RotateCW,
  MoveDown,
} from './Move';

enum State {
  ARE,
  PLAYING,
  LINE_CLEAR,
  GAME_OVER,
}

const pointsPerLine = [0, 40, 100, 300, 1200];

export class Game {
  private moves: Move[];
  private DAS: AutoShift;
  private board: Board;
  private gravity: Gravity;
  private softDrop: Gravity;
  private keyStates: KeyState;
  private state: State;
  private lineClearAnimationFrame: number;
  private initialLevel: number;
  private level: number;
  private linesBeforeFirstLevelUp: number;
  private totalLinesCleared: number;
  private score: number;
  private linesClearedThroughTetris: number;
  private tetrisRate: number;
  private drought: number;
  private burn: number;
  private entryDelay: number;
  private downPressed: boolean;
  private frameNum: number;

  public constructor(initialLevel: number, pieceOrder?: TetrominoLetter[]) {
    this.moves = [];
    this.DAS = new AutoShift();
    this.board = new Board(pieceOrder);
    this.gravity = new Gravity({ speed: Infinity });
    this.softDrop = new Gravity({ speed: 2 });

    this.keyStates = {
      down: false,
      left: false,
      right: false,
      rotateCW: false,
      rotateACW: false,
    };

    this.downPressed = false;

    this.state = State.ARE;
    this.lineClearAnimationFrame = 0;
    this.entryDelay = 0;

    this.initialLevel = initialLevel;
    this.level = initialLevel;
    this.linesBeforeFirstLevelUp = Game.getLinesUntilFirstLevelUp(initialLevel);
    this.totalLinesCleared = 0;
    this.score = 0;
    this.linesClearedThroughTetris = 0;
    this.tetrisRate = 0;
    this.drought = 0;
    this.burn = 0;
    this.frameNum = 0;
  }

  /**
   * Method called by controller to progress game by 1 frame.
   *
   * Returns a GameState object representing the current state of the game.
   */
  public nextFrame(inputs: KeyState): GameState {
    this.handleKeysPressed(inputs);
    this.handleKeysReleased(inputs);

    this.keyStates = { ...inputs };

    this.doFrame();
    this.frameNum++;

    return {
      isGameOver: this.state === State.GAME_OVER,
      board: this.board.getState(),
      nextPiece: this.board.nextTetromino.state,
      level: this.level,
      lines: this.totalLinesCleared,
      score: this.score,
      tetrisRate: this.tetrisRate,
      drought: this.drought,
      burn: this.burn,
    };
  }

  private handleKeysPressed(inputs: KeyState): void {
    const downPressed = !this.keyStates.down && inputs.down;
    const leftPressed = !this.keyStates.left && inputs.left;
    const rightPressed = !this.keyStates.right && inputs.right;
    const rotateCWPressed = !this.keyStates.rotateCW && inputs.rotateCW;
    const rotateACWPressed = !this.keyStates.rotateACW && inputs.rotateACW;

    if (leftPressed) {
      if (inputs.right) {
        this.DAS.disable();
      } else {
        this.moves.push(MoveLeft);
        this.DAS.startMovingLeft();
      }
    }

    if (rightPressed) {
      if (inputs.left) {
        this.DAS.disable();
      } else {
        this.moves.push(MoveRight);
        this.DAS.startMovingRight();
      }
    }

    if (rotateCWPressed) {
      this.moves.push(RotateCW);
    }

    if (rotateACWPressed) {
      this.moves.push(RotateACW);
    }

    if (downPressed) {
      this.softDrop.counter = -1;
      this.gravity.counter = 0;
      this.moves.push(MoveDown);

      // the user just pressed down
      // this gets reset when a new piece drops
      this.downPressed = true;
    }
  }

  private handleKeysReleased(inputs: KeyState): void {
    const downReleased = this.keyStates.down && !inputs.down;
    const leftReleased = this.keyStates.left && !inputs.left;
    const rightReleased = this.keyStates.right && !inputs.right;
    // const rotateCWReleased = this.keyStates.rotateCW && !inputs.rotateCW;
    // const rotateACWReleased = this.keyStates.rotateACW && !inputs.rotateACW;

    if (leftReleased) {
      this.DAS.disable();
      if (inputs.right) {
        this.moves.push(MoveRight);
        this.DAS.startMovingRight();
      }
    }

    if (rightReleased) {
      this.DAS.disable();
      if (inputs.left) {
        this.moves.push(MoveLeft);
        this.DAS.startMovingLeft();
      }
    }

    if (downReleased) {
      this.downPressed = false;
    }
  }

  private doFrame(): void {
    if (this.state === State.LINE_CLEAR) {
      this.doLineClearFrame();
    } else if (this.state === State.ARE) {
      if (this.entryDelay > 1) {
        this.entryDelay--;
      } else {
        const canPlaceTetromino = this.board.newActiveTetromino();
        this.state = canPlaceTetromino ? State.PLAYING : State.GAME_OVER;

        this.downPressed = false;

        // update drought counter
        if (this.board.nextTetromino.letter === 'I') {
          this.drought = 0;
        } else {
          this.drought++;
        }

        this.DAS.moveNextFrame();
      }
    } else if (this.state === State.PLAYING) {
      const gravityDropping = !this.downPressed && this.gravity.isDropping();
      const softDropping = this.downPressed && this.softDrop.isDropping();

      if (gravityDropping || softDropping) {
        this.moves.push(MoveDown);
      }

      // gravity doesn't kick in until frame 96
      if (this.frameNum === 96) {
        this.moves.push(MoveDown);
        this.gravity = new Gravity({ level: this.initialLevel });
      }

      for (const move of this.moves) {
        let moveWasSuccessful = move(this.board);
        if (!moveWasSuccessful && move === MoveDown) {
          this.onLockDown();
        }
      }
      this.moves = [];

      this.DAS.step(move => this.moves.push(move));
    }
  }

  private doLineClearFrame(): void {
    if (this.lineClearAnimationFrame < 20) {
      if (this.lineClearAnimationFrame % 4 === 3) {
        let columnIndex = (this.lineClearAnimationFrame + 1) / 4 - 1;
        this.board.clearLines(columnIndex);
      }
      this.lineClearAnimationFrame++;
    } else {
      this.board.moveLinesDown();

      const numLinesCleared = this.board.getNumLinesCleared();

      const tensBefore = Math.floor(this.totalLinesCleared / 10);
      this.totalLinesCleared += numLinesCleared;
      const tensAfter = Math.floor(this.totalLinesCleared / 10);

      // level up if reached initial threshold
      // or past initial threshold and another 10 lines were cleared
      const isInitLevel = this.level === this.initialLevel;
      if (!isInitLevel && tensBefore !== tensAfter) {
        this.levelUp();
      } else if (
        isInitLevel &&
        this.totalLinesCleared >= this.linesBeforeFirstLevelUp
      ) {
        this.levelUp();
      }

      // re-calculate tetris rate and update burn counter
      if (numLinesCleared === 4) {
        this.linesClearedThroughTetris += 4;
        this.burn = 0;
      } else {
        this.burn += numLinesCleared;
      }
      this.tetrisRate = Math.round(
        (100 * this.linesClearedThroughTetris) / this.totalLinesCleared,
      );

      this.state = State.ARE;
    }
  }

  private onLockDown(): void {
    this.board.pieceLock();

    const numLinesToClear = this.board.findLinesToClear();

    if (numLinesToClear > 0) {
      this.state = State.LINE_CLEAR;
      this.lineClearAnimationFrame = 0;

      this.incrementScore(numLinesToClear);
    } else {
      const activeTetrominoRow = this.board.activeTetromino.row;
      this.entryDelay = Game.getEntryDelay(activeTetrominoRow);
      this.state = State.ARE;
    }
  }

  private incrementScore(numLinesCleared: number): void {
    const linePoints = pointsPerLine[numLinesCleared] || 0;
    this.score += linePoints * (this.level + 1);
  }

  private levelUp(): void {
    this.level++;
    this.gravity = new Gravity({ level: this.level });
  }

  private static getEntryDelay(activeTetrominoRow: number): number {
    return 10 + Math.floor((Math.min(activeTetrominoRow, 17) + 2) / 4) * 2;
  }

  public static getLinesUntilFirstLevelUp(initLevel: number): number {
    if (initLevel < 9) return 10 * initLevel + 10;

    if (initLevel < 16) return 100;

    return 10 * initLevel - 50;
  }
}
