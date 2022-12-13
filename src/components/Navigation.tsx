import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { routes, useCurrentRoute, Route } from '../constants/routes';

type NavItemProps = {
  itemRoute: Route;
};

const NavItem: React.FC<NavItemProps> = props => {
  const { itemRoute, children } = props;

  const { currentRoute } = useCurrentRoute();
  const itemIsCurrentRoute = itemRoute.path === currentRoute.path;

  return (
    <Box>
      <Link to={itemRoute.path} style={{ textDecoration: 'none' }}>
        <Typography
          variant="button"
          sx={{
            color: currentRoute.isDarkMode ? 'white' : 'text.primary',
            '&:hover': { '& div': { width: '100%' } },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
          <Box
            sx={{
              width: itemIsCurrentRoute ? '100%' : '0',
              height: 4,
              backgroundColor: currentRoute.isDarkMode
                ? 'secondary.main'
                : 'secondary.dark',
              transitionDuration: '300ms',
            }}
          />
        </Typography>
      </Link>
    </Box>
  );
};

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = props => {
  const navRoutes = [routes.home, routes.projectDescription, routes.tetris];

  return (
    <Box
      sx={{
        m: 0,
        pt: 2,
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
      {navRoutes.map(route => (
        <NavItem key={route.path} itemRoute={route}>
          {route.name}
        </NavItem>
      ))}
    </Box>
  );
};

export { Navigation };
