import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ComputerIcon from '@mui/icons-material/Computer';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { routes } from '../../constants/routes';
import { Button, VideoPlayer } from '../../components';
import tetrisImage from '../../assets/ProjectDescription/tetris-pattern.png';
// @ts-ignore
import video from '../../assets/ProjectDescription/tetris-video.mp4';
import { FeatureDescription } from './FeatureDescription';

type ProjectDescriptionProps = {};

const ProjectDescription: React.FC<ProjectDescriptionProps> = props => {
  const { palette } = useTheme();

  const spaced = {
    ':before': { content: '" "' },
    ':after': { content: '" "' },
  };

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <Typography variant="h1" sx={{ mt: 12, fontWeight: '700' }}>
        Tetris Project
      </Typography>

      <Box sx={{ mt: 6, maxWidth: '590px', textAlign: 'center' }}>
        <Typography variant="h3">
          An
          <Box sx={{ ...spaced, display: 'inline', color: 'secondary.dark' }}>
            exact clone
          </Box>
          of Classic NES Tetris with a
          <Box sx={{ ...spaced, display: 'inline', color: 'primary.dark' }}>
            modern user interface
          </Box>
        </Typography>
      </Box>

      <Box sx={{ mt: 5, width: '200px', height: '200px' }}>
        <img
          src={tetrisImage}
          alt="Tetris Project"
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        />
      </Box>

      <Box sx={{ mt: 8, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
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

      <Stack
        sx={{
          pt: 2,
          px: { lg: 10, md: 5, sm: 3, xs: 3 },
          width: '100%',
          background: `linear-gradient(180deg, ${palette.bg.blue} 0%, white 60%)`,
          alignItems: 'center',
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
            <Typography variant="body1" sx={{ mt: 4 }}>
              After watching the Classic Tetris World Championships, I wanted to
              try NES Tetris myself
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              However, I was not a fan of the limited accessibility and
              30-year-old user interface
            </Typography>
            <Typography variant="body1" sx={{ mt: 4 }}>
              So I decided to make my own
            </Typography>

            <Grid container gap={4} sx={{ mt: 6 }}>
              <Grid item>
                <Button
                  component={Link}
                  to={routes.tetris.path}
                  color="secondary"
                >
                  Play the game
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  href="https://github.com/OllieFranklin/website-react/tree/master/src/containers/Tetris"
                  target="_blank"
                >
                  Source code
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Stack sx={{ alignItems: 'center' }}>
            <VideoPlayer
              src={video}
              style={{ width: '640px', height: '360px' }}
            />
            <a
              href="https://www.youtube.com/watch?v=FzyMIiIN4io"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                Classic Tetris World Championships
              </Typography>
            </a>
          </Stack>
        </Box>

        <Typography variant="h3" sx={{ mt: 16, textAlign: 'center' }}>
          Some of the features include...
        </Typography>

        <Box
          sx={{
            my: 6,
            inlineSize: 'fit-content',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <FeatureDescription
            IconComponent={VideogameAssetIcon}
            heading="Exact Clone"
            description="My version of the game plays exactly the same as the NES version"
            button={
              <Button variant="text" color="primary">
                How I tested this
              </Button>
            }
          />
          <FeatureDescription
            IconComponent={ComputerIcon}
            heading="Modern UI"
            description="Built in React, my main goal was to improve the UX from the original"
            button={
              <Button
                variant="text"
                color="primary"
                component={Link}
                to={routes.tetris.path}
              >
                See for yourself
              </Button>
            }
          />
          <FeatureDescription
            IconComponent={AssessmentIcon}
            heading="Extra Statistics"
            description="The game provides additional statistics such as tetris rate, droughts, and burns"
            button={
              <Button
                variant="text"
                color="primary"
                component={Link}
                to={routes.tetris.path}
              >
                See for yourself
              </Button>
            }
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export { ProjectDescription };
