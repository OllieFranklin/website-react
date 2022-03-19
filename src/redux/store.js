import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tetrisReducer from '../containers/Tetris/controller/tetrisSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    tetris: tetrisReducer,
  },
});
