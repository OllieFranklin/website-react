import React from 'react';
import { Link } from 'react-router-dom';

export const ProjectDescription = () => {
  return (
    <div className="project-description-container full-page-container">
      <Link to="/" className="close-button">
        <span className="close-icon material-icons">close</span>
      </Link>
      <div className="project-description">
        <h1>Tetris Project</h1>
        <p>
          As a fan of the Classic Tetris World Championships, a competition
          which uses the classic NES version of the game, I started playing
          classic Tetris in my free time. However, I was not a fan of the
          limited accessibility and outdated interface that the over 30-year-old
          game provides.
        </p>
        <p>
          I have made a web-based version of Tetris which has the exact same
          mechanics as NES Tetris, but with a modern user interface. Inspired by
          keybr.com, I am planning to incorporate a system to keep track of my
          statistics over time using Ruby on Rails. This will allow me to track
          my improvement as I play games of Tetris.
        </p>
        <p>
          This project is still a work-in-progress, but the current version and
          its source code can be viewed below.
        </p>
        <div className="button-container">
          <Link to="/tetris" className="button3 button btn">
            View&nbsp;Project
          </Link>
          <a
            className="button4 button btn"
            href="https://github.com/OllieFranklin/website/tree/gh-pages/tetris"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source&nbsp;Code
          </a>
        </div>
      </div>
    </div>
  );
};
