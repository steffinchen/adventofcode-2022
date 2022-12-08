import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

let input = getInput('day6');

const findMarker = (string, len) => {
  for (let i = len; i < string.length; i++) {
    let slice = string.substring(i - len, i);
    if (_.uniq(slice).length == len) return i;
  }
};

let a = findMarker(input, 4);
console.log('🚀 -> Part 1', a);

let b = findMarker(input, 14);
console.log('🚀 -> Part 2', b);
