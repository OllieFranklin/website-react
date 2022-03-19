import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import { Home } from './containers/Home';
import { ProjectDescription } from './containers/ProjectDescription';
import { Tetris } from './containers/Tetris';

import { Counter } from './features/counter/Counter';

import Navigation from './components/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/tetris" exact element={<Tetris />} />
          <Route path="/project" exact element={<ProjectDescription />} />
          <Route path="/redux" exact element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
