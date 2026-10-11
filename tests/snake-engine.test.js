import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame, spawnFood, step, SIZE} from '../src/snake-engine.js';

test('collecting food grows the snake and adds one point', () => {
  const game = {...newGame(), phase: 'running', food: {x: 5, y: 5}};
  const next = step(game, {x: 1, y: 0}, () => 0);
  assert.equal(next.score, 1);
  assert.equal(next.snake.length, 4);
  assert.ok(!next.snake.some(cell => cell.x === next.food.x && cell.y === next.food.y));
});
test('reverse input is ignored and paused games do not advance', () => {
  const game = {...newGame(), phase: 'running'};
  assert.equal(step(game, {x: -1, y: 0}).snake[0].x, 5);
  const paused = {...game, phase: 'paused'};
  assert.equal(step(paused, {x: 1, y: 0}), paused);
});
test('wall and body collisions end the game', () => {
  const game = {...newGame(), phase: 'running'};
  assert.equal(step({...game, snake: [{x: 11, y: 5}]}, {x: 1, y: 0}).phase, 'over');
  assert.equal(step({...game, snake: [{x: 4, y: 5}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 4, y: 6}]}, {x: 1, y: 0}).phase, 'over');
});
test('moving into a vacated tail is legal and a full board has no food slot', () => {
  const game = {...newGame(), phase: 'running', snake: [{x: 4, y: 5}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 5, y: 5}], food: {x: 0, y: 0}};
  assert.equal(step(game, {x: 1, y: 0}).phase, 'running');
  const full = Array.from({length: SIZE * SIZE}, (_, index) => ({x: index % SIZE, y: Math.floor(index / SIZE)}));
  assert.equal(spawnFood(full), null);
});
