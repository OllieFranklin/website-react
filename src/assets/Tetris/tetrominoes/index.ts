import defaultI from './default/I_Tetromino.png';
import defaultJ from './default/J_Tetromino.png';
import defaultL from './default/L_Tetromino.png';
import defaultO from './default/O_Tetromino.png';
import defaultS from './default/S_Tetromino.png';
import defaultT from './default/T_Tetromino.png';
import defaultZ from './default/Z_Tetromino.png';
import { TetrominoLetter } from '../../../containers/Tetris/model';

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
