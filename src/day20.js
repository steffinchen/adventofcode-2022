import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `1
2
-3
3
-2
0
4`;

let input = getInput('day20');

const mix = (numbers) => {
  let result = _.clone(numbers);
  return numbers.reduce((result, number) => {
    let index = result.indexOf(number);
    let newIndex = index + number;
    if (number === 0) {
      //   console.log('no changes', result.join(', '));
      return result;
    }
    if (newIndex < 0) {
      newIndex = newIndex + result.length - 1;
    } else {
      newIndex = newIndex % result.length;
    }
    if (newIndex === 0) {
      let firstPart = result.slice(0, index);
      let secondPart = result.slice(index + 1);
      let foo = [...firstPart, ...secondPart, number];
      //   console.log('to end', foo.join(', '));
      return foo;
    } else if (newIndex > index) {
      let firstPart = result.slice(0, index);
      let secondPart = result.slice(index + 1, newIndex + 1);
      let thirdPart = result.slice(newIndex + 1);
      let foo = [...firstPart, ...secondPart, number, ...thirdPart];
      //   console.log('forward', foo.join(', '));
      return foo;
    } else {
      let firstPart = result.slice(0, newIndex + 1);
      let secondPart = result.slice(newIndex + 1, index);
      let thirdPart = result.slice(index + 1);
      let bar = [...firstPart, number, ...secondPart, ...thirdPart];
      //   console.log('backward', bar.join(', '));
      return bar;
    }
  }, result);
};

const getResult = (numbers) => {
  let index = numbers.indexOf(0);
  return (
    numbers[(index + 1000) % numbers.length] +
    numbers[(index + 2000) % numbers.length] +
    numbers[(index + 3000) % numbers.length]
  );
};

let numbers = input.split(/\n/).map((line) => parseInt(line));
// console.log('🚀 -> numbers', numbers);
let mixed = mix(numbers);
//7364 too lowx
let a = getResult(mixed);
console.log('🚀 -> Part 1', a);

let b = '';
console.log('🚀 -> Part 2', b);
