import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import OllieButton from '../../components/OllieButton';
import VideoPlayer from '../../components/VideoPlayer';
import tetrisImage from '../../assets/Home/tetris-pattern.png';
import video from '../../assets/Home/tetris-video.mp4';

import './ProjectDescription.css';

export const ProjectDescription = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      pb={20}
    >
      <Typography variant="h1" mt={7} sx={{ fontWeight: '700' }}>
        Tetris Project
      </Typography>

      <Box mt={6} sx={{ maxWidth: 590, textAlign: 'center' }}>
        <Typography variant="h3">
          An{' '}
          {
            <Box sx={{ display: 'inline', color: 'secondary.dark' }}>
              exact clone
            </Box>
          }{' '}
          of Classic NES Tetris with a{' '}
          {
            <Box sx={{ display: 'inline', color: 'primary.dark' }}>
              modern user interface
            </Box>
          }
        </Typography>
      </Box>

      <Box mt={5} sx={{ width: '200px', height: '200px' }}>
        <img
          src={tetrisImage}
          alt="Tetris Project"
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </Box>

      <Box
        mt={8}
        sx={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#CEEAF4"
          ></path>
        </svg>
      </Box>

      <Box
        px={10}
        pt={2}
        pb={10}
        sx={{
          width: '100%',
          // backgroundColor: '#F1F1EC',
          backgroundColor: '#CEEAF4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 8,
            flexWrap: 'wrap',
            inlineSize: 'fit-content',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '500px' } }}>
            <Typography variant="h3">About the project</Typography>
            <Typography variant="body1" mt={4}>
              After watching the Classic Tetris World Championships, I wanted to
              try NES Tetris myself
            </Typography>
            <Typography variant="body1" mt={2}>
              However, I was not a fan of the limited accessibility and
              30-year-old user interface
            </Typography>
            <Typography variant="body1" mt={4}>
              So I decided to make my own
            </Typography>

            <Grid container gap={4} mt={6}>
              <Grid item>
                <OllieButton component={Link} to="/tetris" color="secondary">
                  Play the game
                </OllieButton>
              </Grid>
              <Grid item>
                <OllieButton
                  variant="outlined"
                  href="https://github.com/OllieFranklin/website-react/tree/master/src/containers/Tetris"
                  target="_blank"
                >
                  Source code
                </OllieButton>
              </Grid>
            </Grid>
          </Box>
          <VideoPlayer
            src={video}
            style={{ width: '640px', height: '360px' }}
          />
        </Box>
      </Box>

      {/* <div class="custom-shape-divider-top-1643532000">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div> */}

      <Box
        sx={{
          height: '250px',
          width: '100%',
          background: 'linear-gradient(180deg, #CEEAF4 0%, white 100%)',
        }}
      />
      <Box
        sx={{
          height: '400px',
          width: '100%',
          background: 'white',
        }}
      />
    </Box>
  );
};
