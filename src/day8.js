import _ from 'lodash';
import { getInput } from './helper.js';
import assert from 'node:assert';

const testInput = `30373
25512
65332
33549
35390`;

let input = getInput('day8');

const isVisible = (grid, x, y) => {
  if (x == 0 || y == 0) return true;
  if (x == grid.length - 1) return true;
  if (y == grid[x].length - 1) return true;

  let tree = grid[x][y];

  let tallerLeft = grid[x].slice(0, y).find((el) => el >= tree);
  if (tallerLeft === undefined) return true;

  let tallerRight = grid[x]
    .slice(y + 1, grid[x].length)
    .find((el) => el >= tree);
  if (tallerRight === undefined) return true;

  let tallerTop = grid
    .map((row) => row[y])
    .slice(0, x)
    .find((el) => el >= tree);
  if (tallerTop === undefined) return true;

  let tallerBottom = grid
    .map((row) => row[y])
    .slice(x + 1, grid.length)
    .find((el) => el >= tree);
  if (tallerBottom === undefined) return true;

  return false;
};

let grid = input.split(/\n/).map((line) => [...line].map((c) => parseInt(c)));

const getLeftScore = (grid, x, y) => {
  let tree = grid[x][y];
  let left = _.reverse(grid[x].slice(0, y));
  let score = 0;
  for (let t2 of left) {
    score++;
    if (t2 >= tree) break;
  }
  return score;
};

const getRightScore = (grid, x, y) => {
  let tree = grid[x][y];
  let right = grid[x].slice(y + 1, grid[x].lenght);
  let score = 0;
  for (let t2 of right) {
    score++;
    if (t2 >= tree) break;
  }
  return score;
};

const getTopScore = (grid, x, y) => {
  let tree = grid[x][y];
  let top = _.reverse(grid.map((row) => row[y]).slice(0, x));
  let score = 0;
  for (let t2 of top) {
    score++;
    if (t2 >= tree) break;
  }
  return score;
};

const getBottomScore = (grid, x, y) => {
  let tree = grid[x][y];
  let bottom = grid.map((row) => row[y]).slice(x + 1, grid.length);
  let score = 0;
  for (let t2 of bottom) {
    score++;
    if (t2 >= tree) break;
  }
  return score;
};
const calcScenicScore = (grid, x, y) => {
  let left = getLeftScore(grid, x, y);
  let right = getRightScore(grid, x, y);
  let top = getTopScore(grid, x, y);
  let bottom = getBottomScore(grid, x, y);
  return left * right * top * bottom;
};

let a = grid.reduce(
  (count, row, x, grid) =>
    count +
    row.reduce(
      (innerCount, col, y) =>
        isVisible(grid, x, y) ? innerCount + 1 : innerCount,
      0
    ),
  0
);
console.log('🚀 -> Part 1', a);

let b = _.chain(grid)
  .map((row, x) => row.map((cell, y) => calcScenicScore(grid, x, y)))
  .map((row) => _.max(row))
  .max()
  .value();
console.log('🚀 -> Part 2', b);
