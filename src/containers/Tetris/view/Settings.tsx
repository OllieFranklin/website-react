import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Button } from '../../../components';
import Grid from '@mui/material/Grid';

type SettingsProps = {};

const Settings: React.FC<SettingsProps> = props => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" sx={{ mt: 14 }}>
        Game Over
      </Typography>
      <Grid container spacing={2} sx={{ mt: 6, width: '800px' }}>
        <Grid item xs={6}>
          1
        </Grid>
        <Grid item xs={6}>
          2
        </Grid>
      </Grid>

      <Box sx={{ mt: 16 }}>
        <Button color="secondary" onClick={() => {}}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export { Settings };
