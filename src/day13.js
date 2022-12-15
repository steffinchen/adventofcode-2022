import _ from 'lodash';
import { getInput } from './helper.js';
import assert from 'node:assert';

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

let input = getInput('day13');

const checkPair = (left, right) => {
  //if both are integers
  if (Number.isInteger(left) && Number.isInteger(right) && left !== right) {
    return left < right;
  }
  //if one is integer and one is array
  if (Number.isInteger(left) && Array.isArray(right)) {
    return checkPair([left], right);
  }
  if (Number.isInteger(right) && Array.isArray(left)) {
    return checkPair(left, [right]);
  }
  //if both are arrays
  if (Array.isArray(left) && Array.isArray(right)) {
    //compare each item in left to each item in right
    let allResults = [];
    for (let i = 0; i < left.length && right.length; i++) {
      let result = checkPair(left[i], right[i]);
      if (result !== undefined) {
        allResults.push(result);
        break;
      }
    }
    if (left.length <= right.length) {
      return allResults.every((result) => {
        return result === true;
      });
    } else return false;
  }
};

let packets = input
  .split(/\n\n/)
  .map((pair) => pair.split(/\n/).map((part) => JSON.parse(part)));

let a = _.map(packets, (pair) => checkPair(pair[0], pair[1])).reduce(
  (sum, result, index) => {
    if (result === undefined) {
      console.log('found undefined for pair', index);
      return sum;
    }
    if (result) return sum + index + 1;
    return sum;
  },
  0
);

//6048 is wrong
//2102 is too low
console.log('🚀 -> Part 1', a);

let b = '';
console.log('🚀 -> Part 2', b);
