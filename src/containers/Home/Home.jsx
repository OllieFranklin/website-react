import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import Earth from './Earth';
import OllieButton from '../../components/OllieButton';
import star1 from '../../assets/Home/star1.svg';
import star2 from '../../assets/Home/star2.svg';
import './Home.css';

export default function Home() {
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

  const Background = () => {
    return (
      <Box
        sx={{
          backgroundColor: '#2f3742',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        {starElements}
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ height: '100vh' }}></Box>
        <Box
          sx={{
            margin: { xs: 4, sm: 8 },
            inlineSize: 'fit-content',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 8,
            columnGap: 12,
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '550px' } }}>
            <Typography variant="h1" color="white">
              Ollie Franklin
            </Typography>
            <Box mt={4}>
              <Typography variant="h2" color="white">
                {/* A Wellington-based developer with a passion for front-end */}
                A software engineering student with a passion for front-end
                development
              </Typography>
              <Grid container gap={4} mt={6}>
                <Grid item>
                  <OllieButton component={Link} to="/project" color="secondary">
                    Personal Project
                  </OllieButton>
                </Grid>
                <Grid item>
                  <OllieButton
                    color="primary"
                    href="https://github.com/OllieFranklin"
                    target="_blank"
                  >
                    Github
                  </OllieButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Earth />
        </Box>
      </Box>

      <Background />
    </>
  );
}
