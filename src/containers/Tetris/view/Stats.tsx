import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Statistics, BoardLetter } from '../model';
import { TetrisBoard } from '../../../components';
import { TetrominoTextureSet } from '../../../constants/textures';

type StatsItemProps = {
  name: string;
  value: number | string;
};

const StatsItem: React.FC<StatsItemProps> = props => {
  const { name, value } = props;

  const isScreenTall = useMediaQuery('(min-height: 825px)');

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h4">
        <span style={{ fontWeight: '600' }}>{name}</span>
        {!isScreenTall && <span>&nbsp;–&nbsp;{value || 0}</span>}
      </Typography>
      {isScreenTall && (
        <Typography variant="h4" sx={{ mt: 1, textAlign: 'center' }}>
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
    <Stack sx={{ minWidth: `${cellSize * 5}px`, gap: 3 }}>
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
        <Box
          sx={{
            height: `${cellSize * 2}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TetrisBoard
            boardRef={nextPieceRef}
            tetrominoTextures={tetrominoTextures}
            numRows={nextPieceRef.current.length}
            numCols={nextPieceRef.current?.[0]?.length ?? 0}
            cellSize={cellSize}
            isDebug={false}
          />
        </Box>
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
    </Stack>
  );
};

export { Stats };
