import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#5db0f2',
        dark: '#1281bf',
        light: '#94e2ff',
        contrastText: '#000000',
      },
      secondary: {
        main: '#02ee60',
        dark: '#00ba2f',
        light: '#69ff91',
        contrastText: '#000000',
      },
      text: {
        primary: '#1A1C1E',
      },
    },
    typography: {
      fontFamily: 'Nunito',
      h1: {
        fontFamily: 'Nunito',
        fontWeight: 600,
        fontSize: '4.6rem',
      },
      h2: {
        fontFamily: 'Nunito',
        fontWeight: 500,
        fontSize: '2.2rem',
      },
      h3: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '28px',
      },
      h4: {
        fontFamily: 'Montserrat',
        fontWeight: 400,
        fontSize: '1.6rem',
      },
      body1: {
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: '20px',
      },
      button: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '20px',
        textTransform: 'none',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  }),
);

export default theme;
