import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Button } from '../../../components';
import { GameOverStatistics } from '../model';

type GameOverStatProps = {
  name: string;
  value: string;
};

const GameOverStat: React.FC<GameOverStatProps> = props => {
  const { name, value } = props;

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: '600' }}>
        {name}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

type GameOverProps = {
  stats: GameOverStatistics;
  handleOnShowLevelSelect: () => void;
};

const GameOver: React.FC<GameOverProps> = props => {
  const { stats, handleOnShowLevelSelect } = props;

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
        <Grid item xs={4}>
          <GameOverStat
            name="Score"
            value={Number(stats.score).toLocaleString()}
          />
        </Grid>
        <Grid item xs={4}>
          <GameOverStat name="Lines" value={`${stats.lines}`} />
        </Grid>
        <Grid item xs={4}>
          <GameOverStat
            name="Starting Level"
            value={`${stats.startingLevel}`}
          />
        </Grid>
        <Grid item xs={4}>
          <GameOverStat name="Final Level" value={`${stats.finalLevel}`} />
        </Grid>
        <Grid item xs={4}>
          <GameOverStat name="Tetris Rate" value={`${stats.tetrisRate}%`} />
        </Grid>
        <Grid item xs={4}>
          <GameOverStat
            name="Longest Drought"
            value={`${stats.longestDrought}`}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 16 }}>
        <Button color="secondary" onClick={handleOnShowLevelSelect}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export { GameOver };
