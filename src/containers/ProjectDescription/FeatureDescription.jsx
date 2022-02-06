import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FeatureDescription(props) {
  const { icon, heading, description, button } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '300px',
        textAlign: 'center',
      }}
      m={1}
      p={1}
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
        {icon}
      </Box>
      <Typography variant="h3" mt={4}>
        {heading}
      </Typography>
      <Typography variant="body1" mt={3} sx={{ flex: 1 }}>
        {description}
      </Typography>
      <Box mt={3}>{button}</Box>
    </Box>
  );
}
