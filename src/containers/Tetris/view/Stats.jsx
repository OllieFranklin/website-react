import React from 'react';
import { tetrominoTexturesDefault } from '../../../assets/Tetris/tetrominoes';

const StatsItem = ({ name, value }) => {
  return (
    <div style={{ height: '33%' }}>
      <h4>
        <b>{name}</b>
        <span className="stat-sm">&nbsp;–&nbsp;&nbsp;{value || 0}</span>
      </h4>
      <h4 className="stat-lg">{value || 0}</h4>
    </div>
  );
};

export const Stats = ({ stats, cellSize }) => {
  const { nextPiece, level, lines, score, tetrisRate, drought, burn } = stats;

  const canvasRef = React.useRef();

  // resize function for next box
  React.useEffect(() => {
    const handleResize = () => {
      // and make sure that the width & height of the canvas match the style width & height
      if (canvasRef.current.height !== canvasRef.current.offsetHeight) {
        canvasRef.current.height = canvasRef.current.offsetHeight;
        canvasRef.current.width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', handleResize);

    setTimeout(handleResize, 10);
  }, []);

  React.useEffect(() => {
    const renderNextBox = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

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
    <div id="stats-container" className="my-d-md-flex">
      <div className="my-row my-card my-shadow-sm" id="stats-panel-1">
        <div style={{ height: '20%' }}>
          <h4>
            <b>Next Piece</b>
          </h4>
        </div>
        <canvas id="next-box" ref={canvasRef}></canvas>
      </div>

      <div className="my-row my-card my-shadow-sm" id="stats-panel-2">
        <StatsItem name="Level" value={level} />
        <StatsItem name="Lines" value={lines} />
        <StatsItem name="Score" value={score} />
      </div>

      <div className="my-row my-card my-shadow-sm" id="stats-panel-3">
        <StatsItem name="Tetris Rate" value={`${tetrisRate}%`} />
        <StatsItem name="Drought" value={drought} />
        <StatsItem name="Burn" value={burn} />
      </div>
    </div>
  );
};
