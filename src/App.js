import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { flatRoutes, routes } from './constants';
import { Navigation } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {Object.values(flatRoutes).map(({ path, Component }) => (
          <Route key={path} path={path} exact element={<Component />} />
        ))}
        <Route path="*" exact element={<routes.notFound.Component />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
