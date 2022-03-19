import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { tetrominoTexturesDefault } from '../../../assets/Tetris/tetrominoes';

const StatsItem = ({ name, value }) => {
  return (
    <Box px={2}>
      <Typography variant="h4">
        <span style={{ fontWeight: '600' }}>{name}</span>
        <span className="stat-sm">&nbsp;–&nbsp;{value || 0}</span>
      </Typography>
      <Typography
        variant="h4"
        className="stat-lg"
        mt={1}
        sx={{ textAlign: 'center' }}
      >
        {value || 0}
      </Typography>
    </Box>
  );
};

export const Stats = ({ stats, cellSize }) => {
  const { nextPiece, level, lines, score, tetrisRate, drought, burn } = stats;

  const canvasRef = React.useRef();

  const handleResize = React.useCallback(() => {
    // make sure that the width & height of the canvas match the style width & height
    if (canvasRef.current.height !== canvasRef.current.offsetHeight) {
      canvasRef.current.height = canvasRef.current.offsetHeight;
      canvasRef.current.width = canvasRef.current.offsetWidth;
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 10);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const renderNextBox = () => {
      if (!nextPiece) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tetromino = nextPiece;
      const rows = tetromino.length;
      const cols = tetromino[0].length;

      const left = Math.round((canvas.width - cols * cellSize) * 0.5);
      const top = Math.round((canvas.height - rows * cellSize) * 0.5);

      for (let row = 0; row < rows; row++) {
        const y = top + row * cellSize;

        for (let col = 0; col < cols; col++) {
          const x = left + col * cellSize;

          const cell = tetromino[row][col];

          const texture = tetrominoTexturesDefault[cell];
          if (texture) {
            ctx.drawImage(texture, x, y, cellSize, cellSize);
          }
        }
      }
    };

    requestAnimationFrame(renderNextBox);
  }, [nextPiece, cellSize]);

  return (
    <Box
      sx={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Paper
        style={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Next Piece
        </Typography>
        <canvas ref={canvasRef} style={{ height: '50%', width: '210px' }} />
      </Paper>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 3,
        }}
      >
        <StatsItem name="Level" value={level} />
        <StatsItem name="Lines" value={lines} />
        <StatsItem name="Score" value={score} />
      </Paper>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 3,
        }}
      >
        <StatsItem name="Tetris Rate" value={`${tetrisRate}%`} />
        <StatsItem name="Drought" value={drought} />
        <StatsItem name="Burn" value={burn} />
      </Paper>
    </Box>
  );
};
