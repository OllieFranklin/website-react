import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: '2rem',
  borderRadius: 10,
  maxWidth: 300,
  width: '100%',
}));

export default function OllieButton(props: React.ReactPropTypes) {
  return <StyledButton color="secondary" variant="contained" {...props} />;
}
