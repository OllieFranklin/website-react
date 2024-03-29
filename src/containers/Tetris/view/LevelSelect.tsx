import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { routes } from '../../../constants/routes';
import { Button } from '../../../components';
import { Game, Gravity } from '../model';
import { featureFlags } from '../../../constants/featureFlags';

function getLevelData(level: number) {
  const dropRate = new Gravity({ level }).framesPerCell;
  const linesUntilLevelUp = Game.getLinesUntilFirstLevelUp(level);

  return { level, dropRate, linesUntilLevelUp };
}

type LevelSelectProps = {
  handleOnStartGame: (level: number) => void;
};

const LevelSelect: React.FC<LevelSelectProps> = props => {
  const { handleOnStartGame } = props;

  const [levelData, setLevelData] = React.useState(getLevelData(18));

  const handleOnChangeSlider = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      const newLevelData = getLevelData(value);
      setLevelData(newLevelData);
    }
  };

  const handleOnClickStart = () => {
    handleOnStartGame(levelData.level);
  };

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (!event.repeat && event.key === 'Enter') {
        handleOnStartGame(levelData.level);
      }
    },
    [handleOnStartGame, levelData],
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
        Pick a Starting Level
      </Typography>
      <Box sx={{ width: 300, pt: 5 }}>
        <Slider
          aria-label="Level Select"
          defaultValue={15}
          getAriaValueText={value => `Level ${value}`}
          valueLabelDisplay="off"
          step={1}
          min={0}
          max={19}
          color="primary"
          onChange={handleOnChangeSlider}
          value={levelData.level}
        />
      </Box>
      <Typography
        variant="h2"
        sx={{ pt: 2, fontWeight: 600 }}
      >{`Level ${levelData.level}`}</Typography>
      <Typography
        variant="h4"
        sx={{ pt: 2, fontWeight: 500 }}
      >{`${levelData.dropRate} frames/drop`}</Typography>
      <Typography
        variant="h4"
        sx={{ pt: 1, fontWeight: 500 }}
      >{`${levelData.linesUntilLevelUp} lines until level up`}</Typography>
      <Box
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button color="secondary" size="large" onClick={handleOnClickStart}>
          Start Game
        </Button>
        {featureFlags.enableTestUI && (
          <Button
            sx={{ pt: 2 }}
            variant="text"
            size="large"
            component={Link}
            to={routes.tetris.test.path}
          >
            Test Game
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { LevelSelect };
