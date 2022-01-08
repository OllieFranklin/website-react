import React from 'react';

export const GameOver = () => {
  return (
    <div id="game-over-container" className="row h-100">
      <div className="col-3"></div>
      <div id="game-over-page" className="d-flex col-6">
        <h1>Game Over</h1>
        <h4>Score: TODO</h4>
        <h4>Lines: TODO</h4>
        <h4>Starting Level: TODO</h4>
        <h4>Tetris Rate: TODO</h4>
        <h4>Largest Drought: TODO</h4>
        <h4>&nbsp;</h4>
        <p>[Line graph of points gained throughout game]</p>
        <h4>&nbsp;</h4>
        <p>[Line graph of play field height throughout game]</p>
        <h4>&nbsp;</h4>
        <p>[Bar chart of piece distribution]</p>

        <button id="select-level-btn" className="button">
          <b>Continue</b>
        </button>
      </div>
      <div className="col-3"></div>
    </div>
  );
};