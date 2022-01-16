import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import OllieButton from '../../components/OllieButton';
import logo from '../../assets/Home/logo.svg';
import planet1 from '../../assets/Home/planet1.svg';
import planet2 from '../../assets/Home/planet2.svg';
import star1 from '../../assets/Home/star1.svg';
import star2 from '../../assets/Home/star2.svg';
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <img src={logo} className="logo" alt="Logo" />

        <Box mt={6} sx={{ width: 300 }}>
          <OllieButton component={Link} to="/project" color="secondary">
            Personal Project
          </OllieButton>
        </Box>
        <Box mt={4} sx={{ width: 300 }}>
          <OllieButton
            color="primary"
            href="https://github.com/OllieFranklin"
            target="_blank"
          >
            Github
          </OllieButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2f3742',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    >
      <img src={planet1} className="planet planet1" alt="Planet 1" />
      <img src={planet2} className="planet planet2" alt="Planet 2" />

      {starElements}

      <MainContainer />
    </Box>
  );
};
