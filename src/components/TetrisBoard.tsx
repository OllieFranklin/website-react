import React from 'react';

import { BoardLetter } from '../containers/Tetris/model';
import { TetrominoTextureSet } from '../hooks';

type TetrisBoardProps = {
  boardRef: React.MutableRefObject<BoardLetter[][]>;
  tetrominoTextures: TetrominoTextureSet;
  cellSize: number;
  numRows: number;
  numCols: number;
  isDebug?: boolean;
};

const TetrisBoard: React.FC<TetrisBoardProps> = props => {
  const {
    boardRef,
    tetrominoTextures,
    cellSize,
    numRows,
    numCols,
    isDebug = true,
  } = props;

  const height = cellSize * numRows;
  const width = cellSize * numCols;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRequestID = React.useRef<number | null>(null);

  const fpsDataRef = React.useRef({
    filterStrength: 60, // Use 60-frame weighted average
    textUpdateFrequency: 60, // Update fpsText every 60 frames
    frameTime: 0,
    lastLoop: Date.now(),
    framesSinceLastUpdate: 0,
    fpsText: '',
  });

  const renderFPS = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.font = 'bold 20px sans-serif';
      const textPadding = 10;
      ctx.lineWidth = 6;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'white';
      ctx.strokeText(
        fpsDataRef.current.fpsText,
        width - textPadding,
        textPadding,
      );
      ctx.fillText(
        fpsDataRef.current.fpsText,
        width - textPadding,
        textPadding,
      );
    },
    [width],
  );

  const renderBoard = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const ctx = canvas.getContext('2d');
    if (ctx === null) return;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    const board = boardRef.current;
    for (let row = 0; row < numRows; row++) {
      const y = row * cellSize;
      for (let col = 0; col < numCols; col++) {
        const cell = board?.[row]?.[col];
        if (cell && cell !== ' ') {
          const x = col * cellSize;
          const texture = tetrominoTextures[cell];
          ctx.drawImage(texture, x, y, cellSize, cellSize);
        }
      }
    }

    if (isDebug && fpsDataRef.current.frameTime > 0) {
      renderFPS(ctx);
    }
  }, [
    boardRef,
    numCols,
    numRows,
    cellSize,
    isDebug,
    tetrominoTextures,
    renderFPS,
  ]);

  const updateFPS = () => {
    const { lastLoop, frameTime, filterStrength, textUpdateFrequency } =
      fpsDataRef.current;
    const thisLoop = Date.now();

    fpsDataRef.current.lastLoop = thisLoop;
    fpsDataRef.current.frameTime =
      frameTime + (thisLoop - lastLoop - frameTime) / filterStrength;
    fpsDataRef.current.framesSinceLastUpdate++;

    if (fpsDataRef.current.framesSinceLastUpdate > textUpdateFrequency) {
      const fps = Math.round(1000 / fpsDataRef.current.frameTime);
      fpsDataRef.current.fpsText = `${fps} fps`;
      fpsDataRef.current.framesSinceLastUpdate = 0;
    }
  };

  const tick = React.useCallback(() => {
    updateFPS();
    renderBoard();
    animationRequestID.current = requestAnimationFrame(tick);
  }, [renderBoard]);

  React.useEffect(() => {
    animationRequestID.current = requestAnimationFrame(tick);

    return () => {
      if (animationRequestID.current !== null) {
        cancelAnimationFrame(animationRequestID.current);
      }
    };
  }, [tick]);

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    </div>
  );
};

export { TetrisBoard };
