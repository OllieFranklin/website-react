import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

import { TetrisBoard } from '../../../../components';
import { tetrominoTexturesDefault } from '../../../../hooks';
import { useTetrisTestOracle } from './useTetrisTestOracle';

type TetrisTestUIProps = {};

const TetrisTestUI: React.FC<TetrisTestUIProps> = props => {
  const { palette } = useTheme();

  const [cellSize, setCellSize] = React.useState(0);

  const boardsRef = React.useRef<HTMLDivElement>(null);

  const { testOracleBoardRef, frameNum, modelOutputBoardRef } =
    useTetrisTestOracle();

  const handleResize = React.useCallback(() => {
    if (boardsRef.current == null) return;

    const height90 = 0.9 * boardsRef.current.scrollHeight;
    const numRows = 20;
    const newCellSize = (height90 - (height90 % numRows)) / numRows;

    setCellSize(newCellSize);
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 10);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Box
      sx={{
        pt: 6,
        minHeight: '500px',
        overflowY: 'inherit',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: palette.bg.grey,
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Typography variant="h2">{`Frame ${frameNum}`}</Typography>
        <Stack
          ref={boardsRef}
          direction="row"
          sx={{ gap: 4, height: '100%', alignItems: 'center' }}
        >
          <Box>
            <Typography variant="h4">Test Oracle</Typography>
            <Paper>
              <TetrisBoard
                boardRef={testOracleBoardRef}
                cellSize={cellSize}
                numCols={10}
                numRows={20}
                tetrominoTextures={tetrominoTexturesDefault}
                isDebug={false}
              />
            </Paper>
          </Box>
          <Box>
            <Typography variant="h4">Actual Output</Typography>
            <Paper>
              <TetrisBoard
                boardRef={modelOutputBoardRef}
                cellSize={cellSize}
                numCols={10}
                numRows={20}
                tetrominoTextures={tetrominoTexturesDefault}
                isDebug={false}
              />
            </Paper>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export { TetrisTestUI };
