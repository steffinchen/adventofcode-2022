import _ from "lodash";
import { getInput } from "./helper.js";
import assert from "node:assert";

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

let input = getInput("day13");

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
    //compare each item in left to each item in right until one is not undefined
    for (let i = 0; i < left.length && right.length; i++) {
      let result = checkPair(left[i], right[i]);
      if (result !== undefined) {
        return result;
      }
    }
    return left.length === right.length
      ? undefined
      : left.length < right.length;
  }
};

assert(checkPair([], []) === undefined);
assert(checkPair([], [1]) === true);
assert(checkPair([1], []) === false);
assert(checkPair([[4, 4], 4, 4], [[4, 4], 4, 4, 4]) === true);
assert(checkPair([7, 7, 7, 7], [7, 7, 7]) === false);
assert(checkPair(1, 2) === true);
assert(checkPair(2, 1) === false);
assert(checkPair(1, 1) === undefined);
assert(checkPair([2, 3, 4], [4]) === true);
assert(checkPair([[[]]], [[]]) === false);
assert(checkPair([5, 6, 7], [5, 6, 0]) === false);
assert(checkPair([3, [4, [5, 6, 7]]], [3, [4, [5, 6, 0]]]) === false);
assert(checkPair([2, 3], [3]) === true);

let packets = input
  .split(/\n\n/)
  .map((pair) => pair.split(/\n/).map((part) => JSON.parse(part)));

let a = _.map(packets, (pair) => checkPair(pair[0], pair[1])).reduce(
  (sum, result, index) => (result ? sum + index + 1 : sum),
  0
);

console.log("🚀 -> Part 1", a);

let withDividerPackets = (
  input +
  `
[[2]]
[[6]]`
)
  .replace(/\n\n/g, "\n")
  .split(/\n/)
  .map((packet) => JSON.parse(packet));
let sorted = withDividerPackets.sort((a, b) => (checkPair(a, b) ? -1 : 1));
let b = sorted.reduce(
  (decoderKey, packet, i) =>
    _.isEqual(packet, [[2]]) || _.isEqual(packet, [[6]])
      ? decoderKey * (i + 1)
      : decoderKey,
  1
);
console.log("🚀 -> Part 2", b);
