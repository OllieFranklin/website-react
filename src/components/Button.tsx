import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ButtonProps = MuiButtonProps & {
  // Absolutely no idea why I have to specify these three but it won't work otherwise
  target?: string;
  component?: any;
  to?: string;
};

const Button: React.FC<ButtonProps> = props => {
  const {
    color,
    variant = 'contained',
    size = 'medium',
    children,
    sx,
    ...restProps
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
        ...sx,
      }}
      {...restProps}
    >
      <Typography
        sx={{ mx: 2, fontSize: size === 'large' ? '20px !important' : 'unset' }}
        variant="button"
      >
        {children}
      </Typography>
    </MuiButton>
  );
};

export { Button };
