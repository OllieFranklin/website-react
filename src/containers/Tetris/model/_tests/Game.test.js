const Game = require('../Game');

test('testing something', () => {

  const game = new Game(10);

  game.nextFrame({false, false, false, false, false});

  expect(sum(1, 2)).toBe(3);
});
