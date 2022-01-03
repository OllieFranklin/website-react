import I from './textures/tetrominoes/default/I_Tetromino.png';
import J from './textures/tetrominoes/default/J_Tetromino.png';
import L from './textures/tetrominoes/default/L_Tetromino.png';
import O from './textures/tetrominoes/default/O_Tetromino.png';
import S from './textures/tetrominoes/default/S_Tetromino.png';
import T from './textures/tetrominoes/default/T_Tetromino.png';
import Z from './textures/tetrominoes/default/Z_Tetromino.png';

const textures = new Map();

const tetriminoTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
const tetriminoTextures = [I, J, L, O, S, T, Z];
for (let i = 0; i < tetriminoTypes.length; i++) {
  const texture = new Image();
  texture.src = tetriminoTextures[i];
  textures.set(tetriminoTypes[i], texture);
}

export default textures;
