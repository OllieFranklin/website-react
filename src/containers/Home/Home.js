/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import planet1 from '../../assets/planet1.svg';
import planet2 from '../../assets/planet2.svg';
import star1 from '../../assets/star1.svg';
import star2 from '../../assets/star2.svg';
import './Home.css';

export const Home = () => {
  const [starElements, setStarElements] = React.useState([]);

  React.useEffect(() => {
    const getRandomStar = (source, key) => {
      let left = Math.random();
      let top = Math.random();

      const styles = {
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${10 * (0.5 - Math.random())}s`,
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        height: '2%',
      };

      return (
        <img src={source} style={styles} className="star" key={key} alt={key} />
      );
    };

    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const numStars = (screenWidth * screenHeight) / 25000;

    const stars = [];

    for (let i = 0; i < numStars; i++) {
      const source = i % 2 ? star1 : star2;
      const key = `star${i}`;
      stars.push(getRandomStar(source, key));
    }

    setStarElements(stars);
  }, []);

  const MainContainer = () => {
    return (
      <div className="main-container full-page-container">
        <img src={logo} className="logo" alt="Logo" />
        <Link to="/project" className="button1 button btn">
          Personal&nbsp;Project
        </Link>
        <a
          className="button2 button btn"
          href="https://github.com/OllieFranklin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    );
  };

  return (
    <div className="background">
      <img src={planet1} className="planet planet1" alt="Planet 1" />
      <img src={planet2} className="planet planet2" alt="Planet 2" />

      {starElements}

      <MainContainer />
    </div>
  );
};
