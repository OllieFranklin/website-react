import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '../../../components/Button';
import { Game, GravityBuilder } from '../model';

function getLevelData(level) {
  const dropRate = new GravityBuilder().withLevel(level).framesPerCell;
  const linesUntilLevelUp = Game.getLinesUntilFirstLevelUp(level);

  return { level, dropRate, linesUntilLevelUp };
}

export const LevelSelect = ({ handleOnStartGame }) => {
  const [levelData, setLevelData] = React.useState(getLevelData(8));

  const handleOnChangeSlider = event => {
    const { target: { value: level = 0 } = {} } = event || {};

    const newLevelData = getLevelData(level);
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
      </Box>
    </Box>
  );
};
