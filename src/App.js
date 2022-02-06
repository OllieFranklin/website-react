import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './containers/Home';
import { ProjectDescription } from './containers/ProjectDescription';
import { Tetris } from './containers/Tetris';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {console.log('App has rendered')}
        <Route path="/" exact element={<Home />} />
        <Route path="/tetris" exact element={<Tetris />} />
        <Route path="/project" exact element={<ProjectDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
