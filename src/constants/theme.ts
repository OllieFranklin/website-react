import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Nunito',
    h1: {
      fontFamily: 'Nunito',
      fontWeight: 600,
      fontSize: '3.2rem',
    },
    h2: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '2.6rem',
    },
    h3: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '1.6rem',
    },
    body1: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '1.3rem',
    },
  },
});

export default theme;
