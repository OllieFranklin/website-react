import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../model';

export const tetrisSlice = createSlice({
  name: 'tetris',
  initialState: {
    value: new Game(0),
  },
  reducers: {
    reset: state => {
      state.value = new Game(0);
    },
  },
});

export const { reset } = tetrisSlice.actions;
export default tetrisSlice.reducer;
