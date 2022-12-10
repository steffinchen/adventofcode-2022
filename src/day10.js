import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `noop
addx 3
addx -5`;

const testInput2 = getInput('day10-sample2');
let input = getInput('day10');

const execute = (registerX, line, i) => {
  let [cmd, val] = line.split(' ');
  let currentX = registerX?.[registerX.length - 1];
  if (cmd === 'noop') {
    registerX.push(currentX);
  }
  if (cmd === 'addx') {
    registerX.push(currentX);
    const x = currentX + parseInt(val);
    registerX.push(x);
  }
  return registerX;
};

let a = input
  .split(/\n/)
  .reduce(execute, [1])
  .reduce((strength, x, i) => {
    const cycle = i + 1;
    if (cycle <= 220 && (cycle - 20) % 40 === 0) {
      return strength + x * cycle;
    }
    return strength;
  }, 0);

console.log('🚀 -> Part 1', a);

let b = input
  .split(/\n/)
  .reduce(execute, [1])
  .reduce((line, x, i) => {
    let sprite = i % 40;
    if (x == sprite || x == sprite - 1 || x == sprite + 1) {
      line = line + '■ ';
    } else {
      line = line + '  ';
    }
    if (sprite === 39) {
      console.log(line);
      line = '';
    }
    return line;
  }, '');
console.log('🚀 -> Part 2', b);
