import React from 'react';

export const LevelSelect = () => {
  return (
    <div id="level-selection-container" class="row h-100">
      <div id="level-selection-page" class="d-flex col align-items-center">
        <h1>Pick a Starting Level</h1>
        <input type="range" min="0" max="19" id="level-range" />

        <h2 id="level-select-value">&lt;LEVEL_SELECT_VALUE&gt;</h2>
        <h4 id="drop-rate-desc">&lt;DROP_RATE_DESC&gt;</h4>
        <h4 id="lines-to-level-up">&lt;LINES_TO_LEVEL&gt;</h4>

        <button class="button" id="new-game-btn">
          <b>Start</b>
        </button>
      </div>
    </div>
  );
};
