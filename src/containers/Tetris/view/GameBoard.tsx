import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { tetrominoTexturesDefault } from '../../../assets/Tetris/tetrominoes';
import { Stats } from './Stats';

// todo: find a better way to get this
type Tetromino = keyof typeof tetrominoTexturesDefault;

type GameBoardProps = {
  board: React.MutableRefObject<Tetromino[][]>;
  stats: any;
};

const GameBoard: React.FC<GameBoardProps> = props => {
  const { board, stats } = props;

  const [boardHasLoaded, setBoardHasLoaded] = React.useState(false);
  const [canvasStyles, setCanvasStyles] = React.useState({});
  const [cellSize, setCellSize] = React.useState(0);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pageRef = React.useRef<HTMLDivElement>(null);

  const handleResize = React.useCallback(() => {
    if (pageRef.current == null || canvasRef.current == null) return;

    // find a width for the board that's divisible by 10
    // this ensures that all cells can be rendered on integer values

    // set the board height to 90% page height
    const height90 = 0.9 * pageRef.current.offsetHeight;
    const boardHeight = height90 - (height90 % 20);

    setCanvasStyles({
      height: `${boardHeight}px`,
      width: `${boardHeight * 0.5}px`,
    });

    // and make sure that the width & height of the canvas match the style width & height
    if (canvasRef.current.height !== canvasRef.current.offsetHeight) {
      canvasRef.current.height = canvasRef.current.offsetHeight;
      canvasRef.current.width = canvasRef.current.offsetWidth;
    }

    // // also update the stats container to be the same height as the board
    // document.querySelector('#stats-container').style.height =
    //   this.canvas.style.height;

    setCellSize(canvasRef.current.width / 10);

    setBoardHasLoaded(true);
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 10);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // render function called each frame of game
  // handles displaying the game at the native framerate decided by requestAnimationFrame
  // the game logic (i.e. what to show at any given moment) is run in a separate loop
  React.useEffect(() => {
    if (canvasRef.current == null) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;

    const renderBoard = () => {
      if (!board) {
        requestAnimationFrame(renderBoard);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rows = board.current.length;
      const cols = board.current[0].length;

      for (let row = 0; row < rows; row++) {
        const y = row * cellSize;

        for (let col = 0; col < cols; col++) {
          const x = col * cellSize;

          const cell = board.current[row][col];
          const texture = tetrominoTexturesDefault[cell];

          if (texture) {
            ctx.drawImage(texture, x, y, cellSize, cellSize);
          }
        }
      }

      requestAnimationFrame(renderBoard);
    };

    renderBoard();
  }, [board, cellSize]);

  return (
    <Box
      ref={pageRef}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" sx={{ gap: 3 }}>
        <Paper elevation={1}>
          <canvas style={canvasStyles} ref={canvasRef}></canvas>
        </Paper>

        {boardHasLoaded && <Stats stats={stats} cellSize={cellSize} />}
      </Stack>
    </Box>
  );
};

export { GameBoard };
