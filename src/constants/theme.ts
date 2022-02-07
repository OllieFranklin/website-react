import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundBlue: string;
  }
  interface PaletteOptions {
    backgroundBlue: string;
  }
}

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
      backgroundBlue: '#CEEAF4',
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
        fontSize: '19px',
      },
      button: {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '19px',
        textTransform: 'none',
      },
      caption: {
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: '16px',
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
