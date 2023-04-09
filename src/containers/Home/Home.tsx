import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { routes } from '../../constants/routes';
import { Earth } from './Earth';
import { Button } from '../../components';
import star1 from '../../assets/Home/star1.svg';
import star2 from '../../assets/Home/star2.svg';
import { featureFlags } from '../../constants/featureFlags';
import './Home.css';

type StarProps = { source: string; key: string };

const Star: React.FC<StarProps> = ({ source, key }) => {
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

type HomeProps = {};

const Home: React.FC<HomeProps> = props => {
  const starElements = React.useMemo(() => {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const numStars = (screenWidth * screenHeight) / 25000;

    return Array.from({ length: numStars }).map((_, i) => {
      const source = i % 2 ? star1 : star2;
      return <Star source={source} key={`star${i}`} />;
    });
  }, []);

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
          py={6}
        >
          <Box sx={{ width: { xs: '100%', sm: '550px' } }}>
            <Typography
              variant="h1"
              color="white"
              sx={{
                background: '#2f3742',
                boxShadow: '0px 0px 20px 20px #2f3742',
              }}
            >
              Ollie Franklin
            </Typography>
            <Box mt={4}>
              <Typography
                variant="h2"
                color="white"
                sx={{
                  background: '#2f3742',
                  boxShadow: '0px 0px 20px 20px #2f3742',
                }}
              >
                A software developer who loves creating interesting things with
                code
              </Typography>
              <Grid container gap={4} mt={6}>
                <Grid item>
                  <Button
                    component={Link}
                    to={
                      featureFlags.enableProjectDescription
                        ? routes.projectDescription.path
                        : routes.tetris.path
                    }
                    color="secondary"
                    size="large"
                  >
                    Personal Project
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    href="https://github.com/OllieFranklin"
                    target="_blank"
                    size="large"
                  >
                    Github
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Earth />
        </Box>
      </Box>

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
    </>
  );
};

export { Home };
