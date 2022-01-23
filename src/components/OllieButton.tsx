import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(() => ({
  borderRadius: 25,
  maxWidth: 300,
  width: '100%',
  color: '#181c22',
}));

type Props = {};

export default function OllieButton(props: React.PropsWithChildren<Props>) {
  const { children, ...rest } = props;

  return (
    <StyledButton color="secondary" variant="contained" {...rest}>
      <Box mx={2}>
        <Typography variant="button">{children}</Typography>
      </Box>
    </StyledButton>
  );
}
