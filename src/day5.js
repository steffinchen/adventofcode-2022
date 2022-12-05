import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const transformStacks = (string) => {
  let lines = string.split(/\n/);
  let stacks = _.initial(lines);

  stacks = stacks
    .map((line) => line.replaceAll('    ', '_'))
    .map((stack) => stack.replaceAll(/[\s\[\]]/g, ''))
    .map((stack) => Array.from(stack));
  return _.zip(...stacks)
    .map((stack) => _.reverse(stack))
    .map((row) => row.filter((el) => el !== '_'));
};

const transformMoves = (string) => {
  return string
    .split(/\n/)
    .map((move) => move.split(' '))
    .map((move) => ({
      amount: parseInt(move[1]),
      from: parseInt(move[3]) - 1,
      to: parseInt(move[5]) - 1,
    }));
};

const applyMove = ({ amount, from, to }, stacks) => {
  for (let i = 0; i < amount; i++) {
    stacks[to].push(stacks[from].pop());
  }
  return stacks;
};

const applyMoveWithCrateMover9001 = ({ amount, from, to }, stacks) => {
  const cratesToMove = _.range(amount).map((i) => stacks[from].pop());
  stacks[to] = stacks[to].concat(_.reverse(cratesToMove));
  return stacks;
};

const getTopCrates = (stacks) =>
  stacks.reduce((string, stack) => {
    string += stack.pop();
    return string;
  }, '');

let input = getInput('day5');

let [stacksString, movesString] = input.split(/\n\n/);
const stacks = transformStacks(stacksString);
const stacksCopy = _.cloneDeep(stacks);
const moves = transformMoves(movesString);

let finalStacks = moves.reduce(
  (stacks, move) => applyMove(move, stacks),
  stacks
);
let a = getTopCrates(finalStacks);
console.log('🚀 -> Part 1', a);

let stacksPart2 = moves.reduce(
  (stacks, move) => applyMoveWithCrateMover9001(move, stacks),
  stacksCopy
);
let b = getTopCrates(stacksPart2);
console.log('🚀 -> Part 2', b);
