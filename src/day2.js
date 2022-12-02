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

// Part B
// X LOSE
// Y DRAW
// Z WIN

const points = { X: 1, Y: 2, Z: 3 };

const toWin = {
  A: 'Y',
  B: 'Z',
  C: 'X',
};
const toDraw = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};
const toLose = {
  A: 'Z',
  B: 'X',
  C: 'Y',
};

const calcWin = (shape) => points[shape] + 6;
const calcDraw = (shape) => points[shape] + 3;
const calcLoss = (shape) => points[shape] + 0;

const isWin = (opp, me) => toWin[opp] === me;
const isLoss = (opp, me) => toLose[opp] === me;

const calc = (opponent, me) => {
  if (isWin(opponent, me)) {
    return calcWin(me);
  } else if (isLoss(opponent, me)) {
    return calcLoss(me);
  } else {
    return calcDraw(me);
  }
};

const calcPart2 = (opponent, goal) => {
  if (goal == 'X') {
    const me = toLose[opponent];
    return calcLoss(me);
  } else if (goal == 'Y') {
    const me = toDraw[opponent];
    return calcDraw(me);
  } else if (goal == 'Z') {
    const me = toWin[opponent];
    return calcWin(me);
  }
};

//13009
let a = input
  .split(/\n/)
  .map((line) => line.split(' '))
  .map(([opponent, me]) => calc(opponent, me))
  .reduce(sum, 0);
console.log('🚀 -> Part 1', a);

//10398
let b = input
  .split(/\n/)
  .map((line) => line.split(' '))
  .map(([opponent, me]) => calcPart2(opponent, me))
  .reduce(sum, 0);
console.log('🚀 -> Part 2', b);
