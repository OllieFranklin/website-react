import React from 'react';

export const GameBoard = () => {
  return (
    <div class="align-items-center h-100" id="game-container">
      <div class="row">
        <canvas id="board" class="my-card shadow-sm"></canvas>
        <div id="stats-container" class="d-none d-md-flex">
          <div class="row my-card shadow-sm" id="stats-panel-1">
            <div style={{ height: '20%' }}>
              <h4>
                <b>Next Piece</b>
              </h4>
            </div>
            <canvas id="next-box"></canvas>
          </div>
          <div class="row my-card shadow-sm" id="stats-panel-2">
            <div style={{ height: '33%' }}>
              <h4>
                <b>Level</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="level-stat"></span>
                </span>
              </h4>
              <h4 class="stat-lg level-stat">&lt;LEVEL_STAT&gt;</h4>
            </div>
            <div style={{ height: '33%' }}>
              <h4>
                <b>Lines</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="lines-stat"></span>
                </span>
              </h4>
              <h4 class="stat-lg lines-stat">&lt;LINES_STAT&gt;</h4>
            </div>
            <div style={{ height: '33%' }}>
              <h4>
                <b>Score</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="score-stat"></span>
                </span>
              </h4>
              <h4 class="stat-lg score-stat">&lt;SCORE_STAT&gt;</h4>
            </div>
          </div>
          <div class="row my-card shadow-sm" id="stats-panel-3">
            <div style={{ height: '33%' }}>
              <h4>
                <b>Tetris Rate</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="tetris-rate-stat"></span>%
                </span>
              </h4>
              <h4 class="stat-lg">
                <span class="tetris-rate-stat"></span>%
              </h4>
            </div>
            <div style={{ height: '33%' }}>
              <h4>
                <b>Drought</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="drought-stat"></span>
                </span>
              </h4>
              <h4 class="stat-lg drought-stat">&lt;DROUGHT_STAT&gt;</h4>
            </div>
            <div style={{ height: '33%' }}>
              <h4>
                <b>Burn</b>
                <span class="stat-sm">
                  <span>&nbsp;–&nbsp;&nbsp;</span>
                  <span class="burn-stat"></span>
                </span>
              </h4>
              <h4 class="stat-lg burn-stat">&lt;BURN_STAT&gt;</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
