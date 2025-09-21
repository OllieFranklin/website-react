import React from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

type BaseCardProps = {
  handleFlip: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  elevation?: number;
};
const BaseCard: React.FC<BaseCardProps> = props => {
  const { handleFlip, children, sx, elevation } = props;

  return (
    <Card
      elevation={elevation}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        ...sx,
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
        onClick={() => handleFlip()}
      >
        {children}
      </CardActionArea>
    </Card>
  );
};

type FlipCardProps = {
  showFront: boolean;
  handleFlip: () => void;
  frontElement: () => React.ReactNode;
  backElement: () => React.ReactNode;
};
const FlipCard: React.FC<FlipCardProps> = props => {
  const { showFront, handleFlip, frontElement, backElement } = props;

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '25rem',
        height: '18.75rem',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transition: 'transform 0.4s',
          transformStyle: 'preserve-3d',
          transform: showFront ? 'rotateX(180deg)' : 'rotateX(0deg)',
        }}
      >
        <BaseCard handleFlip={handleFlip} elevation={showFront ? 0 : 2}>
          {backElement()}
        </BaseCard>
        <BaseCard
          handleFlip={handleFlip}
          elevation={showFront ? 2 : 0}
          sx={{ transform: 'rotateX(180deg)' }}
        >
          {frontElement()}
        </BaseCard>
      </Box>
    </Box>
  );
};

export { FlipCard };
