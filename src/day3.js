import _ from 'lodash';
import { getInput, sum } from './helper.js';

const splitLineInHalf = (line) => {
  const half = line.length / 2;
  return [line.substring(0, half), line.substring(half)];
};

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const getPriority = (charCode) =>
  charCode > 96 ? charCode - 96 : charCode - 38;

const findCommonItem = (rucksack1, rucksack2) =>
  _.intersection(Array.from(rucksack1), Array.from(rucksack2));

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

let input = getInput('day3');

let a = input
  .split(/\n/)
  .map(splitLineInHalf)
  .flatMap((rucksack) => findCommonItem(rucksack[0], rucksack[1]))
  .map((item) => item.charCodeAt(0))
  .map(getPriority)
  .reduce(sum);
console.log('🚀 -> Part 1', a);

let b = input
  .split(/\n/)
  .reduce((groups, line, index) => {
    const groupNo = Math.floor(index / 3);
    if (!groups[groupNo]) groups[groupNo] = [];
    groups[groupNo].push(line);
    return groups;
  }, [])
  .flatMap((group) =>
    group.reduce((possibleBadges, rucksack, index) =>
      findCommonItem(possibleBadges, rucksack)
    )
  )
  .map((item) => item.charCodeAt(0))
  .map(getPriority)
  .reduce(sum);
console.log('🚀 -> Part 2', b);
