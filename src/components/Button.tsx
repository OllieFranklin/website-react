import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Button(props: React.PropsWithChildren<MuiButtonProps>) {
  const {
    color,
    variant = 'contained',
    size = 'medium',
    children,
    ...rest
  } = props;

  const isOutlined = variant === 'outlined';
  const isText = variant === 'text';
  const backgroundColour = color
    ? isOutlined || isText
      ? `${color}.dark`
      : color
    : 'text.primary';

  return (
    <MuiButton
      color={color}
      variant={variant}
      size={size}
      style={{ border: isOutlined ? '2px solid' : 'unset' }}
      sx={{
        borderRadius: '25px',
        maxWidth: '300px',
        width: '100%',
        color: backgroundColour,
        borderColor: backgroundColour,
      }}
      {...rest}
    >
      <Box mx={2}>
        <Typography
          sx={{ fontSize: size === 'large' ? '20px !important' : 'unset' }}
          variant="button"
        >
          {children}
        </Typography>
      </Box>
    </MuiButton>
  );
}
