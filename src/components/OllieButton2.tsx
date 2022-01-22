import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontSize: '1.6rem',
  lineHeight: '3.2rem',
  borderRadius: 60,
  maxWidth: 300,
  width: '100%',
  color: '#181c22',
}));

type Props = {};

export default function OllieButton2(props: React.PropsWithChildren<Props>) {
  const { children, ...rest } = props;

  return (
    <StyledButton color="secondary" variant="contained" {...rest}>
      <Box mx={2}>{children}</Box>
    </StyledButton>
  );
}
