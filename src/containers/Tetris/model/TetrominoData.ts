import { TetrominoLetter } from './constants';

export type Orientation = { x: number; y: number }[];

export type TetrominoData = {
  letter: TetrominoLetter;
  orientations: Orientation[];
};

export type TetrominoDataMap = {
  [K in TetrominoLetter]: TetrominoData;
};

export const tetrominoDataObject: TetrominoDataMap = {
  I: {
    letter: 'I',
    orientations: [
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
  },
  J: {
    letter: 'J',
    orientations: [
      [
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
      ],
      [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ],
    ],
  },
  L: {
    letter: 'L',
    orientations: [
      [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ],
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
      ],
    ],
  },
  O: {
    letter: 'O',
    orientations: [
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -1 },
      ],
    ],
  },
  S: {
    letter: 'S',
    orientations: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -1 },
      ],
      [
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
      ],
    ],
  },
  T: {
    letter: 'T',
    orientations: [
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      [
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
    ],
  },
  Z: {
    letter: 'Z',
    orientations: [
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
      ],
      [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
    ],
  },
};

export const tetrominoData = Object.values(tetrominoDataObject);
