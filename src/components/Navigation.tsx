import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type NavItemProps = {
  path: string;
  darkMode?: boolean;
};

export function NavItem(props: React.PropsWithChildren<NavItemProps>) {
  const { path, darkMode = false, children } = props;

  const location = useLocation();
  const isCurrentPath = location.pathname === path;

  return (
    <Box>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Typography
          variant="button"
          sx={{
            color: darkMode ? 'white' : 'text.primary',
            // @ts-ignore
            '&:hover': { '& div': { width: '100%' } },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
          <Box
            sx={{
              width: isCurrentPath ? '100%' : '0',
              height: 4,
              backgroundColor: darkMode ? 'secondary.main' : 'secondary.dark',
              transitionDuration: '300ms',
            }}
          />
        </Typography>
      </Link>
    </Box>
  );
}

export default function Navigation() {
  const { pathname } = useLocation();

  // home page is in dark mode
  const darkMode = pathname === '/';

  return (
    <Box
      m={0}
      pt={2}
      sx={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'flex-end' },
        gap: { xs: 3, sm: 6 },
        paddingRight: { xs: 0, sm: 10 },
      }}
    >
      <NavItem path="/" darkMode={darkMode}>
        Home
      </NavItem>
      <NavItem path="/project" darkMode={darkMode}>
        About project
      </NavItem>
      <NavItem path="/tetris" darkMode={darkMode}>
        Project
      </NavItem>
    </Box>
  );
}
