import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { Home, ProjectDescription } from './containers/Home';
import { Tetris } from './containers/Tetris';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/tetris" exact element={<Tetris />} />
        <Route path="/project" exact element={<ProjectDescription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
