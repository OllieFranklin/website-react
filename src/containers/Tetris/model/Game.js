import { GameState } from './GameState';
import { AutoShift } from './AutoShift';
import { Board } from './Board';
import { Gravity } from './Gravity';
import { KeyState } from './KeyState';
import { MoveLeft, MoveRight, RotateACW, RotateCW, MoveDown } from './Move';
import { I_Tetromino } from './Tetromino';

export let FRAME_NUM = 1;

export class Game {
  static State = {
    ARE: 'ARE',
    PLAYING: 'PLAYING',
    LINE_CLEAR: 'LINE_CLEAR',
    GAME_OVER: 'GAME_OVER',
  };

  static pointsPerLine = Game.initPointsPerLine();

  constructor(initialLevel) {
    this.moves = [];
    this.DAS = new AutoShift();
    this.board = new Board();
    this.gravity = new Gravity().withLevel(initialLevel);
    this.softDrop = new Gravity().withSpeed(2);

    this.keyStates = new KeyState(false, false, false, false, false);

    this.state = Game.State.ARE;
    this.lineClearAnimationFrame = 0;

    this.initialLevel = Number(initialLevel);
    this.level = Number(initialLevel);
    this.linesBeforeFirstLevelUp = Game.getLinesUntilFirstLevelUp(initialLevel);
    this.totalLinesCleared = 0;
    this.score = 0;
    this.linesClearedThroughTetris = 0;
    this.tetrisRate = 0;
    this.drought = 0;
    this.burn = 0;
  }

  /**
   * Method called by controller to progress game by 1 frame.
   *
   * Returns a GameState object representing the current state of the game.
   */
  nextFrame(inputs) {
    this.handleKeysPressed(inputs);
    this.handleKeysReleased(inputs);

    this.keyStates = inputs.copy();

    this.doFrame();

    return new GameState(
      this.state === Game.State.GAME_OVER,
      this.board.getState(),
      this.board.getNextTetromino().getState(),
      this.level,
      this.totalLinesCleared,
      this.score,
      this.tetrisRate,
      this.drought,
      this.burn,
    );
  }

  handleKeysPressed(inputs) {
    const downPressed = !this.keyStates.down && inputs.down;
    const leftPressed = !this.keyStates.left && inputs.left;
    const rightPressed = !this.keyStates.right && inputs.right;
    const rotateCWPressed = !this.keyStates.rotateCW && inputs.rotateCW;
    const rotateACWPressed = !this.keyStates.rotateACW && inputs.rotateACW;

    if (leftPressed) {
      if (inputs.right) {
        this.DAS.disable();
      } else {
        this.moves.push(new MoveLeft());
        this.DAS.startMovingLeft();
      }
    }

    if (rightPressed) {
      if (inputs.left) {
        this.DAS.disable();
      } else {
        this.moves.push(new MoveRight());
        this.DAS.startMovingRight();
      }
    }

    if (rotateCWPressed) {
      this.moves.push(new RotateCW());
    }

    if (rotateACWPressed) {
      this.moves.push(new RotateACW());
    }

    if (downPressed) {
      this.softDrop.setCounter(-1);
      this.gravity.setCounter(0);
      this.moves.push(new MoveDown());
    }
  }

  handleKeysReleased(inputs) {
    // const downReleased = this.keyStates.down && !inputs.down;
    const leftReleased = this.keyStates.left && !inputs.left;
    const rightReleased = this.keyStates.right && !inputs.right;
    // const rotateCWReleased = this.keyStates.rotateCW && !inputs.rotateCW;
    // const rotateACWReleased = this.keyStates.rotateACW && !inputs.rotateACW;

    if (leftReleased) {
      this.DAS.disable();
      if (inputs.right) {
        this.moves.push(new MoveRight());
        this.DAS.startMovingRight();
      }
    }

    if (rightReleased) {
      this.DAS.disable();
      if (inputs.left) {
        this.moves.push(new MoveLeft());
        this.DAS.startMovingLeft();
      }
    }
  }

  doFrame() {
    FRAME_NUM++;

    if (this.state === Game.State.LINE_CLEAR) {
      this.doLineClearFrame();
    } else if (this.state === Game.State.ARE) {
      if (this.entryDelay > 1) {
        this.entryDelay--;
      } else {
        const canPlaceTetromino = this.board.newActiveTetromino();
        this.state = canPlaceTetromino
          ? Game.State.PLAYING
          : Game.State.GAME_OVER;

        // update drought counter
        if (this.board.getNextTetromino() instanceof I_Tetromino) {
          this.drought = 0;
        } else {
          this.drought++;
        }
      }
    } else if (this.state === Game.State.PLAYING) {
      if (
        this.gravity.isDropping() ||
        (this.keyStates.down && this.softDrop.isDropping())
      ) {
        this.moves.push(new MoveDown());
      }

      for (const move of this.moves) {
        let moveWasSuccessful = move.apply(this.board);
        if (!moveWasSuccessful && move instanceof MoveDown) {
          this.onLockDown();
        }
      }
      this.moves = [];

      let autoShiftMove = this.DAS.getNextMove();
      if (autoShiftMove != null) {
        this.moves.push(autoShiftMove);
      }
    }
  }

  doLineClearFrame() {
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

      this.state = Game.State.ARE;
    }
  }

  onLockDown() {
    this.keyStates.down = false;
    this.board.pieceLock();

    const numLinesToClear = this.board.findLinesToClear();

    if (numLinesToClear > 0) {
      this.state = Game.State.LINE_CLEAR;
      this.lineClearAnimationFrame = 0;

      this.incrementScore(numLinesToClear);
    } else {
      const activeTetrominoRow = this.board.getActiveTetromino().getRow();
      this.entryDelay = Game.getEntryDelay(activeTetrominoRow);
      this.state = Game.State.ARE;
    }
  }

  incrementScore(numLinesCleared) {
    this.score += Game.pointsPerLine.get(numLinesCleared) * (this.level + 1);
  }

  levelUp() {
    this.level++;
    this.gravity = new Gravity().withLevel(this.level);
  }

  static getEntryDelay(activeTetrominoRow) {
    return 10 + Math.floor((Math.min(activeTetrominoRow, 17) + 2) / 4) * 2;
  }

  static getLinesUntilFirstLevelUp(initLevel) {
    if (initLevel < 9) return 10 * initLevel + 10;

    if (initLevel < 16) return 100;

    return 10 * initLevel - 50;
  }

  static initPointsPerLine() {
    const output = new Map();

    output.set(1, 40);
    output.set(2, 100);
    output.set(3, 300);
    output.set(4, 1200);

    return output;
  }
}
