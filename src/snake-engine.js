export const SIZE = 12;
export const sameCell = (a, b) => a.x === b.x && a.y === b.y;
export function newGame() {
  return {snake: [{x: 4, y: 5}, {x: 3, y: 5}, {x: 2, y: 5}], food: {x: 8, y: 5}, direction: {x: 1, y: 0}, score: 0, phase: 'ready'};
}
export function spawnFood(snake, random = Math.random) {
  const empty = [];
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!snake.some(cell => sameCell(cell, {x, y}))) empty.push({x, y});
  return empty.length ? empty[Math.min(empty.length - 1, Math.floor(random() * empty.length))] : null;
}
export function step(game, requestedDirection, random = Math.random) {
  if (game.phase !== 'running') return game;
  const reverse = requestedDirection.x === -game.direction.x && requestedDirection.y === -game.direction.y;
  const direction = reverse ? game.direction : requestedDirection;
  const head = {x: game.snake[0].x + direction.x, y: game.snake[0].y + direction.y};
  const eats = game.food && sameCell(head, game.food);
  const body = eats ? game.snake : game.snake.slice(0, -1);
  if (head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE || body.some(cell => sameCell(head, cell))) return {...game, phase: 'over'};
  const snake = [head, ...game.snake];
  if (!eats) snake.pop();
  const food = eats ? spawnFood(snake, random) : game.food;
  return {...game, snake, direction, food, score: game.score + (eats ? 1 : 0), phase: food ? 'running' : 'won'};
}
