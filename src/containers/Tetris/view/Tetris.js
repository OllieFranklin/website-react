/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import './Tetris.css';

export const Tetris = () => {
  return (
    <div>
      <p>Tetris page</p>
      <Link to="/">Home</Link>
    </div>
  );
};
