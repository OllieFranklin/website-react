import React from 'react';
import { useLocation } from 'react-router-dom';

import { Home } from '../containers/Home';
import { NotFound } from '../containers/NotFound';
import { ProjectDescription } from '../containers/ProjectDescription';
import { Tetris } from '../containers/Tetris';
import { TetrisTestUI } from '../containers/Tetris/view/TestUI/TetrisTestUI';
import { Bridge } from '../containers/Bridge';
import { featureFlags } from './featureFlags';

type Route = {
  path: string;
  name: string;
  Component: React.ComponentType;
  isDarkMode: boolean;
  isEnabled: boolean;
};

type Routes = {
  home: Route;
  projectDescription: Route;
  tetris: Route & {
    test: Route;
  };
  bridge: Route;
  notFound: Route;
};

const defaultRoute = {
  isDarkMode: false,
  isEnabled: true,
};

const routes: Routes = {
  home: {
    ...defaultRoute,
    path: '/',
    name: 'Home',
    Component: Home,
    isDarkMode: true,
  },
  projectDescription: {
    ...defaultRoute,
    path: '/about-project',
    name: 'About project',
    Component: ProjectDescription,
    isEnabled: !!featureFlags.enableProjectDescription,
  },
  tetris: {
    ...defaultRoute,
    path: '/tetris',
    name: 'Project',
    Component: Tetris,
    test: {
      ...defaultRoute,
      path: '/tetris/testing',
      name: 'Tetris test',
      Component: TetrisTestUI,
      isEnabled: !!featureFlags.enableTestUI,
    },
  },
  bridge: {
    ...defaultRoute,
    path: '/bridge',
    name: 'Bridge',
    Component: Bridge,
  },
  notFound: {
    ...defaultRoute,
    path: '/not-found',
    name: 'Not found',
    Component: NotFound,
  },
};

type KeysEnum<T> = { [P in keyof Required<T>]: true };
const routeKeys: KeysEnum<Route> = {
  path: true,
  name: true,
  Component: true,
  isDarkMode: true,
  isEnabled: true,
};
const routeKeysArray = Object.keys(routeKeys);

function flattenRoutes(route: any): Route[] {
  return [
    route as Route,
    ...Object.keys(route)
      .filter(key => !routeKeysArray.includes(key))
      .flatMap(key => flattenRoutes(route[key])),
  ];
}
const flatRoutes = Object.values(routes).flatMap(route => flattenRoutes(route));

function useCurrentRoute() {
  const { pathname } = useLocation();

  const currentRoute: Route =
    flatRoutes.find(({ path }) => path === pathname) || routes.notFound;

  return { currentRoute };
}

export type { Route };
export { routes, flatRoutes, useCurrentRoute };
