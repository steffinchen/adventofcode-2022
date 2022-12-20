import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

let input = getInput('day18');

let cubes = testInput
  .split(/\n/)
  .map((line) => line.split(',').map((n) => parseInt(n)));
console.log('🚀 -> cubes -> cubes', cubes);

let a = '';
console.log('🚀 -> Part 1', a);

let b = '';
console.log('🚀 -> Part 2', b);
