import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '../../../components/Button';

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
        <Button color="secondary" onClick={handleOnShowLevelSelect}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};
