import _ from 'lodash';
import { getInput, sum } from './helper.js';

const testInput = `A Y
B X
C Z`;

let input = getInput('day2');

// A, X = ROCK = 1
// B, Y = PAPER = 2
// C, Z = SCISSORES = 3
// LOSS = 0
// DRAW = 3
// WIN = 6

const combos = {
  AX: 4,
  AY: 8,
  AZ: 3,
  BX: 1,
  BY: 5,
  BZ: 9,
  CX: 7,
  CY: 2,
  CZ: 6,
};

// A = ROCK = 1
// B = PAPER = 2
// C = SCISSORES = 3
// X LOSE
// Y DRAW
// Z WIN

const combosPart2 = {
  AX: 3,
  AY: 4,
  AZ: 8,
  BX: 1,
  BY: 5,
  BZ: 9,
  CX: 2,
  CY: 6,
  CZ: 7,
};

let a = input
  .split(/\n/)
  .map((line) => line.replace(' ', ''))
  .map((line) => combos[line])
  .reduce(sum, 0);
console.log('🚀 -> Part 1', a);

let b = input
  .split(/\n/)
  .map((line) => line.replace(' ', ''))
  .map((line) => combosPart2[line])
  .reduce(sum, 0);
console.log('🚀 -> Part 2', b);
