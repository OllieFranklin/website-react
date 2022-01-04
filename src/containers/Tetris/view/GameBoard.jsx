import React from 'react';

import { useTetrisController } from '../controller';
import { tetrominoTexturesDefault } from '../../../assets/Tetris/tetrominoes';

export const GameBoard = () => {
  const [boardHasLoaded, setBoardHasLoaded] = React.useState(false);
  const [canvasStyles, setCanvasStyles] = React.useState({});

  const canvasRef = React.useRef();
  const pageRef = React.useRef();

  const { board, stats, startGame } = useTetrisController();

  // resize function for board
  React.useEffect(() => {
    const handleResize = () => {
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

      setBoardHasLoaded(true);
    };

    window.addEventListener('resize', handleResize);

    setTimeout(handleResize, 10);
  }, []);

  // render function called each frame of game
  // handles displaying the game at the native framerate decided by requestAnimationFrame
  // the game logic (i.e. what to show at any given moment) is run in a separate loop
  React.useEffect(() => {
    startGame(18);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const renderBoard = () => {
      if (!board.current) {
        requestAnimationFrame(renderBoard);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rows = board.current.length;
      const cols = board.current[0].length;

      const cellSize = canvas.width / cols;

      for (let row = 0; row < rows; row++) {
        const y = row * cellSize;

        for (let col = 0; col < cols; col++) {
          const x = col * cellSize;

          const tetromino = board.current[row][col];
          const texture = tetrominoTexturesDefault[tetromino];

          if (texture) {
            ctx.drawImage(texture, x, y, cellSize, cellSize);
          }
        }
      }

      requestAnimationFrame(renderBoard);
    };

    renderBoard();

    // ignore startGame dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <div className="align-items-center h-100" id="game-container" ref={pageRef}>
      <div className="row">
        <canvas
          id="board"
          className="my-card shadow-sm"
          style={canvasStyles}
          ref={canvasRef}
        ></canvas>

        {boardHasLoaded && (
          <div id="stats-container" className="d-none d-md-flex">
            <div className="row my-card shadow-sm" id="stats-panel-1">
              <div style={{ height: '20%' }}>
                <h4>
                  <b>Next Piece</b>
                </h4>
              </div>
              <canvas id="next-box"></canvas>
            </div>
            <div className="row my-card shadow-sm" id="stats-panel-2">
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Level</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="level-stat">{stats.level}</span>
                  </span>
                </h4>
                <h4 className="stat-lg level-stat">{stats.level}</h4>
              </div>
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Lines</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="lines-stat">{stats.lines}</span>
                  </span>
                </h4>
                <h4 className="stat-lg lines-stat">{stats.lines}</h4>
              </div>
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Score</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="score-stat">{stats.score}</span>
                  </span>
                </h4>
                <h4 className="stat-lg score-stat">{stats.score}</h4>
              </div>
            </div>
            <div className="row my-card shadow-sm" id="stats-panel-3">
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Tetris Rate</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="tetris-rate-stat">{stats.tetrisRate}</span>
                    %
                  </span>
                </h4>
                <h4 className="stat-lg">
                  <span className="tetris-rate-stat">{stats.tetrisRate}</span>%
                </h4>
              </div>
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Drought</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="drought-stat">{stats.drought}</span>
                  </span>
                </h4>
                <h4 className="stat-lg drought-stat">{stats.drought}</h4>
              </div>
              <div style={{ height: '33%' }}>
                <h4>
                  <b>Burn</b>
                  <span className="stat-sm">
                    <span>&nbsp;–&nbsp;&nbsp;</span>
                    <span className="burn-stat">{stats.burn}</span>
                  </span>
                </h4>
                <h4 className="stat-lg burn-stat">{stats.burn}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
