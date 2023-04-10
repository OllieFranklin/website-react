import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { BoardLetter, InGameStatistics } from '../model';
import { Stats } from './Stats';
import { tetrominoTexturesDefault } from '../../../constants/textures';
import { TetrisBoard } from '../../../components';

type GameBoardWithStatsProps = {
  boardRef: React.MutableRefObject<BoardLetter[][]>;
  nextPieceRef: React.MutableRefObject<BoardLetter[][]>;
  stats: InGameStatistics;
  togglePlayPause: () => void;
};

const GameBoardWithStats: React.FC<GameBoardWithStatsProps> = props => {
  const { boardRef, nextPieceRef, stats, togglePlayPause } = props;

  const [cellSize, setCellSize] = React.useState(-1);
  const pageRef = React.useRef<HTMLDivElement>(null);

  const boardHasLoaded = cellSize > -1;

  const handleResize = React.useCallback(() => {
    if (pageRef.current == null) return;

    // find an integer cell size that will result in the board
    // taking up around 90% of the screen height
    const height90 = 0.9 * pageRef.current.offsetHeight;
    const numRows = 20;
    const newCellSize = (height90 - (height90 % numRows)) / numRows;

    setCellSize(newCellSize);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!event.repeat && event.key === 'Enter') {
        togglePlayPause();
      }
    },
    [togglePlayPause],
  );

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 10);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      ref={pageRef}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" sx={{ gap: 3 }}>
        <Paper elevation={1} sx={{ lineHeight: 0 }}>
          <TetrisBoard
            boardRef={boardRef}
            tetrominoTextures={tetrominoTexturesDefault}
            cellSize={cellSize}
            numRows={20}
            numCols={10}
            isDebug={false}
          />
        </Paper>

        {boardHasLoaded && (
          <Stats
            nextPieceRef={nextPieceRef}
            cellSize={cellSize}
            tetrominoTextures={tetrominoTexturesDefault}
            stats={stats}
          />
        )}
      </Stack>
    </Box>
  );
};

export { GameBoardWithStats };
