import React from 'react';

import { BoardLetter } from '../containers/Tetris/model';
import {
  TetrominoTextureSet,
  tetrominoTexturesDefault as tetrominoTextures,
} from '../hooks';

type TetrisBoardProps = {
  tetrominoTextures: TetrominoTextureSet;
  boardRef: React.MutableRefObject<BoardLetter[][]>;
  cellSize: number;
};

const TetrisBoard: React.FC<TetrisBoardProps> = props => {
  const { boardRef, cellSize } = props;

  const numRows = boardRef.current?.length ?? 0;
  const numCols = boardRef.current?.[0]?.length ?? 0;

  const [canvasSize, setCanvasSize] = React.useState({
    width: '0px',
    height: '0px',
  });
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const requestID = React.useRef<number | null>(null);

  const updateCanvasSize = React.useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const { width, height } = node.getBoundingClientRect();
      setCanvasSize({ width: `${width}px`, height: `${height}px` });
    }
  }, []);

  // make sure that the width & height of the canvas matches the style width & height
  React.useEffect(() => {
    if (canvasRef.current === null) return;

    canvasRef.current.height = canvasRef.current.offsetHeight;
    canvasRef.current.width = canvasRef.current.offsetWidth;
  }, [canvasRef.current?.offsetHeight, canvasRef.current?.offsetWidth]);

  // https://javascript.plainenglish.io/canvas-animation-inside-react-components-with-requestanimationframe-c5d594afc1b
  const renderBoard = () => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const ctx = canvas.getContext('2d');
    if (ctx === null) return;

    const board = boardRef.current;
    if (board === null) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rows = board?.length ?? 0;
    const cols = board?.[0]?.length ?? 0;
    for (let row = 0; row < rows; row++) {
      const y = row * cellSize;
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize;
        const cell = board[row][col];
        if (cell !== ' ') {
          const texture = tetrominoTextures[cell];
          ctx.drawImage(texture, x, y, cellSize, cellSize);
        }
      }
    }
  };

  const tick = () => {
    // if (!canvasRef.current) return;

    renderBoard();
    requestID.current = requestAnimationFrame(tick);
  };

  React.useEffect(() => {
    requestID.current = requestAnimationFrame(tick);

    return () => {
      if (requestID.current !== null) {
        cancelAnimationFrame(requestID.current);
      }
    };
  }, []);

  // // render function called each frame of game
  // // handles displaying the game at the native framerate decided by requestAnimationFrame
  // // the game logic (i.e. what to show at any given moment) is run in a separate loop
  // React.useEffect(() => {
  //   if (canvasRef.current == null || requestID.current !== null) return;

  //   var filterStrength = 20;
  //   var frameTime = 0,
  //     lastLoop = new Date(),
  //     thisLoop;

  //   console.log('we got here');
  //   requestID.current = requestAnimationFrame(renderBoard);

  //   return () => {
  //     if (requestID.current !== null) {
  //       cancelAnimationFrame(requestID.current);
  //       requestID.current = null;
  //     }
  //   };

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [boardRef]);

  return (
    <div ref={updateCanvasSize}>
      <canvas
        height={canvasSize.height}
        width={canvasSize.width}
        style={{
          height: `${cellSize * numRows}px`,
          width: `${cellSize * numCols}px`,
        }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export { TetrisBoard };
