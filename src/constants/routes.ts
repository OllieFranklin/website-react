import React from 'react';
import { useLocation } from 'react-router-dom';

import { Home } from '../containers/Home';
import { NotFound } from '../containers/NotFound';
import { ProjectDescription } from '../containers/ProjectDescription';
import { Tetris } from '../containers/Tetris';
import { TetrisTestUI } from '../containers/Tetris/view/TestUI/TetrisTestUI';
import { Counter } from '../features/counter/Counter';

type Route = {
  path: string;
  name: string;
  Component: React.ComponentType;
  isDarkMode: boolean;
};

type Routes = {
  home: Route;
  projectDescription: Route;
  tetris: Route & {
    test: Route;
  };
  redux: Route;
  notFound: Route;
};

const notFound: Route = {
  path: '/not-found',
  name: 'Not found',
  Component: NotFound,
  isDarkMode: false,
};

const routes: Routes = {
  home: {
    ...notFound,
    path: '/',
    name: 'Home',
    Component: Home,
    isDarkMode: true,
  },
  projectDescription: {
    ...notFound,
    path: '/about-project',
    name: 'About project',
    Component: ProjectDescription,
  },
  tetris: {
    ...notFound,
    path: '/tetris',
    name: 'Project',
    Component: Tetris,
    test: {
      ...notFound,
      path: '/tetris/testing',
      name: 'Tetris test',
      Component: TetrisTestUI,
    },
  },
  redux: {
    ...notFound,
    path: '/redux',
    name: 'Redux demo',
    Component: Counter,
  },
  notFound,
};

type KeysEnum<T> = { [P in keyof Required<T>]: true };
const routeKeys: KeysEnum<Route> = {
  path: true,
  name: true,
  Component: true,
  isDarkMode: true,
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
    flatRoutes.find(({ path }) => path === pathname) || notFound;

  return { currentRoute };
}

export type { Route };
export { routes, flatRoutes, useCurrentRoute };
