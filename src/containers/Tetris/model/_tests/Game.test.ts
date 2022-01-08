import { Game, GameState } from '../';

test('Game is not over on second frame', () => {
  const game = new Game(10);

  const gameState: GameState = game.nextFrame({
    down: false,
    left: false,
    right: false,
    rotateCW: false,
    rotateAWC: false,
  });

  expect(gameState.isGameOver).toBe(false);
});
