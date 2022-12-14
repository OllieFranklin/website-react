import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Statistics, BoardLetter } from '../model';
import { TetrisBoard } from '../../../components';
import { TetrominoTextureSet } from '../../../hooks';

type StatsItemProps = {
  name: string;
  value: number | string;
};

const StatsItem: React.FC<StatsItemProps> = props => {
  const { name, value } = props;

  const isScreenTall = useMediaQuery('(min-height: 825px)');

  return (
    <Box px={2}>
      <Typography variant="h4">
        <span style={{ fontWeight: '600' }}>{name}</span>
        {!isScreenTall && <span>&nbsp;–&nbsp;{value || 0}</span>}
      </Typography>
      {isScreenTall && (
        <Typography variant="h4" mt={1} sx={{ textAlign: 'center' }}>
          {value || 0}
        </Typography>
      )}
    </Box>
  );
};

type StatsProps = {
  nextPieceRef: React.MutableRefObject<BoardLetter[][]>;
  cellSize: number;
  tetrominoTextures: TetrominoTextureSet;
  stats: Statistics;
};

const Stats: React.FC<StatsProps> = props => {
  const {
    nextPieceRef,
    cellSize,
    tetrominoTextures,
    stats: { level, lines, score, tetrisRate, drought, burn },
  } = props;

  return (
    <Box
      sx={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Paper
        style={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Next Piece
        </Typography>
        <TetrisBoard
          cellSize={cellSize}
          boardRef={nextPieceRef}
          tetrominoTextures={tetrominoTextures}
        />
      </Paper>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 3,
        }}
      >
        <StatsItem name="Level" value={level} />
        <StatsItem name="Lines" value={lines} />
        <StatsItem name="Score" value={score} />
      </Paper>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 3,
        }}
      >
        <StatsItem name="Tetris Rate" value={`${tetrisRate}%`} />
        <StatsItem name="Drought" value={drought} />
        <StatsItem name="Burn" value={burn} />
      </Paper>
    </Box>
  );
};

export { Stats };
