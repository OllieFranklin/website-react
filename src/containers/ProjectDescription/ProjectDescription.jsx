import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ComputerIcon from '@mui/icons-material/Computer';
import AssessmentIcon from '@mui/icons-material/Assessment';

import OllieButton from '../../components/OllieButton';
import VideoPlayer from '../../components/VideoPlayer';
import tetrisImage from '../../assets/ProjectDescription/tetris-pattern.png';
import video from '../../assets/ProjectDescription/tetris-video.mp4';
import FeatureDescription from './FeatureDescription';

export default function ProjectDescription() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" mt={12} sx={{ fontWeight: '700' }}>
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
            fill={palette.bg.blue}
          ></path>
        </svg>
      </Box>

      <Box
        pt={2}
        sx={{
          width: '100%',
          background: `linear-gradient(180deg, ${palette.bg.blue} 0%, white 60%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingX: { lg: 10, md: 5, sm: 3, xs: 3 },
        }}
      >
        <Box
          sx={{
            inlineSize: 'fit-content',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <VideoPlayer
              src={video}
              style={{ width: '640px', height: '360px' }}
            />
            <a
              href="https://www.youtube.com/watch?v=FzyMIiIN4io"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="caption" mt={1} sx={{ textAlign: 'center' }}>
                Classic Tetris World Championships
              </Typography>
            </a>
          </Box>
        </Box>

        <Typography mt={16} variant="h3" sx={{ textAlign: 'center' }}>
          Some of the features include...
        </Typography>

        <Box
          my={6}
          sx={{
            inlineSize: 'fit-content',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <FeatureDescription
            icon={
              <VideogameAssetIcon sx={{ fontSize: '75px', color: 'white' }} />
            }
            heading="Exact Clone"
            description="My version of the game plays exactly the same as the NES version"
            button={
              <OllieButton variant="text" color="primary">
                How I tested this
              </OllieButton>
            }
          />
          <FeatureDescription
            icon={<ComputerIcon sx={{ fontSize: '75px', color: 'white' }} />}
            heading="Modern UI"
            description="Built in React, my main goal was to improve the UX from the original"
            button={
              <OllieButton
                variant="text"
                color="primary"
                component={Link}
                to="/tetris"
              >
                See for yourself
              </OllieButton>
            }
          />
          <FeatureDescription
            icon={<AssessmentIcon sx={{ fontSize: '75px', color: 'white' }} />}
            heading="Extra Statistics"
            description="The game provides additional statistics such as tetris rate, droughts, and burns"
            button={
              <OllieButton
                variant="text"
                color="primary"
                component={Link}
                to="/tetris"
              >
                See for yourself
              </OllieButton>
            }
          />
        </Box>
      </Box>
    </Box>
  );
}
