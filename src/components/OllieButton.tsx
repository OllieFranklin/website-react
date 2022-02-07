import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function OllieButton(
  props: React.PropsWithChildren<ButtonProps>,
) {
  const {
    variant = 'contained',
    color,
    size = 'medium',
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const isOutlined = variant === 'outlined';
  const isText = variant === 'text';
  const colour = color
    ? isOutlined || isText
      ? `${color}.dark`
      : color
    : theme.palette.text.primary;

  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      style={{ border: isOutlined ? '2px solid' : 'unset' }}
      sx={{
        borderRadius: '25px',
        maxWidth: '300px',
        width: '100%',
        color: colour,
        borderColor: colour,
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
    </Button>
  );
}
