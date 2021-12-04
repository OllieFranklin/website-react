import React from 'react';
import logo from '../../assets/logo.svg';
import planet1 from '../../assets/planet1.svg';
import planet2 from '../../assets/planet2.svg';
import './Home.css';

export const Home = () => {
  const [isShowingProjectDesc, setIsShowingProjectDesc] = React.useState(false);

  const MainContainer = () => {
    return (
      <div className="main-container full-page-container">
        <img src={logo} className="logo" alt="Logo" />
        <button
          className="button1 button btn"
          onClick={() => setIsShowingProjectDesc(true)}
        >
          Personal&nbsp;Project
        </button>
        <button
          className="button2 button btn"
          href="https://github.com/OllieFranklin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </button>
      </div>
    );
  };

  const ProjectDescription = () => {
    return (
      <div className="project-description-container full-page-container">
        <span
          className="close-icon material-icons"
          onClick={() => setIsShowingProjectDesc(false)}
        >
          close
        </span>
        <div className="project-description">
          <h1>Tetris Project</h1>
          <p>
            As a fan of the classic Tetris World Championships, a competition
            which uses the classic NES version of the game, I started playing
            classic Tetris in my free time. However, I was not a fan of the
            limited accessibility and outdated interface that the over
            30-year-old game provides.
          </p>
          <p>
            I have made a web-based version of Tetris which has the exact same
            mechanics as NES Tetris, but with a modern user interface. Inspired
            by keybr.com, I am planning to incorporate a system to keep track of
            my statistics over time using Ruby on Rails. This will allow me to
            track my improvement as I play games of Tetris.
          </p>
          <p>
            This project is still a work-in-progress, but the current version
            and its source code can be viewed below.
          </p>
          <div className="button-container">
            <a
              className="button3 button btn"
              href="https://0llie.com/tetris/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View&nbsp;Project
            </a>
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

  return (
    <div className="background">
      <img src={planet1} className="planet planet1" alt="Planet 1" />
      <img src={planet2} className="planet planet2" alt="Planet 2" />

      <MainContainer />

      {isShowingProjectDesc === true && <ProjectDescription />}
    </div>
  );
};
