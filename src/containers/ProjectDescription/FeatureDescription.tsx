import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type FeatureDescriptionProps = {
  IconComponent: any;
  heading: string;
  description: string;
  button: any;
};

const FeatureDescription: React.FC<FeatureDescriptionProps> = props => {
  const { IconComponent, heading, description, button } = props;

  return (
    <Stack
      sx={{
        m: 1,
        p: 1,
        alignItems: 'center',
        maxWidth: '300px',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          backgroundColor: 'primary.dark',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent sx={{ fontSize: '75px', color: 'white' }} />
      </Box>

      <Typography variant="h3" mt={4}>
        {heading}
      </Typography>

      <Typography variant="body1" sx={{ mt: 3, flex: 1 }}>
        {description}
      </Typography>

      <Box sx={{ mt: 3 }}>{button}</Box>
    </Stack>
  );
};

export { FeatureDescription };
