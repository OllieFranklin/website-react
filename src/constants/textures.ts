import defaultI from '../assets/Tetris/tetrominoes/default/I_Tetromino.png';
import defaultJ from '../assets/Tetris/tetrominoes/default/J_Tetromino.png';
import defaultL from '../assets/Tetris/tetrominoes/default/L_Tetromino.png';
import defaultO from '../assets/Tetris/tetrominoes/default/O_Tetromino.png';
import defaultS from '../assets/Tetris/tetrominoes/default/S_Tetromino.png';
import defaultT from '../assets/Tetris/tetrominoes/default/T_Tetromino.png';
import defaultZ from '../assets/Tetris/tetrominoes/default/Z_Tetromino.png';
import { TetrominoLetter } from '../containers/Tetris/model';

// convert base64 images to <img> to be drawn on canvas
const base64ToImg = (base64: string): HTMLImageElement => {
  const img = new Image();
  img.src = base64;

  return img;
};

type TetrominoTextureSet = {
  [K in TetrominoLetter]: HTMLImageElement;
};

const tetrominoTexturesDefault: TetrominoTextureSet = {
  I: base64ToImg(defaultI),
  J: base64ToImg(defaultJ),
  L: base64ToImg(defaultL),
  O: base64ToImg(defaultO),
  S: base64ToImg(defaultS),
  T: base64ToImg(defaultT),
  Z: base64ToImg(defaultZ),
};

export { tetrominoTexturesDefault };
export type { TetrominoTextureSet };
