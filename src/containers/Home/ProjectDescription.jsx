import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import OllieButton from '../../components/OllieButton';

export const ProjectDescription = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
      px={6}
      py={2}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <h1>Tetris Project</h1>
        <Link to="/">
          <CloseIcon fontSize="large" sx={{ color: 'black' }} />
        </Link>
      </Box>

      <p>
        As a fan of the Classic Tetris World Championships, a competition which
        uses the classic NES version of the game, I started playing classic
        Tetris in my free time. However, I was not a fan of the limited
        accessibility and outdated interface that the over 30-year-old game
        provides.
      </p>
      <p>
        I have made a web-based version of Tetris which has the exact same
        mechanics as NES Tetris, but with a modern user interface. I am planning
        to implement a back-end to store game statistics. This will allow me to
        track my improvement over time.
      </p>
      <p>
        This project is still a work-in-progress, but the current version and
        its source code can be viewed below.
      </p>

      <Box mt={6} sx={{ width: 300, alignSelf: 'center' }}>
        <OllieButton component={Link} to="/tetris" color="secondary">
          View Project
        </OllieButton>
      </Box>
      <Box mt={4} sx={{ width: 300, alignSelf: 'center' }}>
        <OllieButton
          color="primary"
          href="https://github.com/OllieFranklin/website-react/tree/master/src/containers/Tetris"
          target="_blank"
        >
          Source Code
        </OllieButton>
      </Box>
    </Box>
  );
};
