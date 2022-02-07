import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './containers/Home';
import { ProjectDescription } from './containers/ProjectDescription';
import { Tetris } from './containers/Tetris';

import Navigation from './components/Navigation';

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/tetris" exact element={<Tetris />} />
        <Route path="/project" exact element={<ProjectDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
