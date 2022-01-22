import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, ProjectDescription } from './containers/Home';
import { Home as Home2 } from './containers/HomePage';
import { Tetris } from './containers/Tetris';

const App = () => {
  return (
    <BrowserRouter basename="/website-react">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/homepage" exact element={<Home2 />} />
        <Route path="/tetris" exact element={<Tetris />} />
        <Route path="/project" exact element={<ProjectDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
