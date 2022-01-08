export type Orientation = { x: number; y: number }[];

export type TetrominoData = {
  letter: string;
  orientations: Orientation[];
};

export const I_TetrominoData: TetrominoData = {
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
};

export const J_TetrominoData: TetrominoData = {
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
};

export const L_TetrominoData: TetrominoData = {
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
};

export const O_TetrominoData: TetrominoData = {
  letter: 'O',
  orientations: [
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
    ],
  ],
};

export const S_TetrominoData: TetrominoData = {
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
};

export const T_TetrominoData: TetrominoData = {
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
};

export const Z_TetrominoData: TetrominoData = {
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
};
