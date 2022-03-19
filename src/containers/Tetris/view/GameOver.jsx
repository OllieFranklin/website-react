import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OllieButton from '../../../components/OllieButton';

export const GameOver = ({ stats, handleOnShowLevelSelect }) => {
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
      <Typography variant="h1" size="large">
        Game Over
      </Typography>
      <Box mt={16}>
        <OllieButton color="secondary" onClick={handleOnShowLevelSelect}>
          Continue
        </OllieButton>
      </Box>
    </Box>
  );
};
