import { getInput } from './helper.js';

const convertToNumbers = (s) => {
  const [start, end] = s.split('-');
  return [parseInt(start), parseInt(end)];
};

const isSubSection = (section1, section2) =>
  section1[0] <= section2[0] && section1[1] >= section2[1];

const isOverlapSection = ([section1, section2]) =>
  (section1[0] <= section2[0] && section1[1] >= section2[0]) ||
  (section2[0] <= section1[0] && section2[1] >= section1[0]);

const checkIfTotalOverlap = ([section1, section2]) =>
  isSubSection(section1, section2) || isSubSection(section2, section1);

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

let input = getInput('day4');

let a = input
  .split(/\n/)
  .map((line) => line.split(','))
  .map((pair) => [convertToNumbers(pair[0]), convertToNumbers(pair[1])])
  .filter((pairs) => checkIfTotalOverlap(pairs)).length;
console.log('🚀 -> Part 1', a);

let b = input
  .split(/\n/)
  .map((line) => line.split(','))
  .map((pair) => [convertToNumbers(pair[0]), convertToNumbers(pair[1])])
  .filter((pairs) => isOverlapSection(pairs)).length;
console.log('🚀 -> Part 2', b);
