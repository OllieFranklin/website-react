import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { routes } from '../../../constants/routes';
import { Button } from '../../../components';
import { Game, Gravity } from '../model';

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
    const newLevelData = getLevelData(value as number);
    setLevelData(newLevelData);
  };

  const handleOnClickStart = () => {
    handleOnStartGame(levelData.level);
  };

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
      <Typography variant="h1">Pick a Starting Level</Typography>
      <Box sx={{ width: 300 }}>
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
      <Typography variant="h2">{`Level ${levelData.level}`}</Typography>
      <Typography variant="h3">{`${levelData.dropRate} frames/drop`}</Typography>
      <Typography variant="h3">{`${levelData.linesUntilLevelUp} lines until level up`}</Typography>
      <Box sx={{ mt: 16 }}>
        <Button color="secondary" size="large" onClick={handleOnClickStart}>
          Start Game
        </Button>
        <Button
          sx={{ pt: 2 }}
          variant="text"
          size="large"
          component={Link}
          to={routes.tetris.test.path}
        >
          Test Game
        </Button>
      </Box>
    </Box>
  );
};

export { LevelSelect };
