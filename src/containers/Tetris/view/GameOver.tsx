import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Button } from '../../../components';
import { Statistics } from '../model';

type GameOverProps = {
  stats: Statistics;
  handleOnShowLevelSelect: () => void;
};

const GameOver: React.FC<GameOverProps> = props => {
  const { handleOnShowLevelSelect } = props;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">Game Over</Typography>
      <Box sx={{ mt: 16 }}>
        <Button color="secondary" onClick={handleOnShowLevelSelect}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export { GameOver };
