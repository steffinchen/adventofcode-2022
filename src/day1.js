import _ from "lodash";
import { getInput, sum } from "./helper.js";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

let input = getInput("day1");

let totalCalPerElf = input
  .split(/\n\n/)
  .map((calorieList) => calorieList.split(/\n/))
  .map((elf) => elf.map((cal) => parseInt(cal)).reduce(sum, 0));
let a = _.max(totalCalPerElf);
console.log("🚀 -> Part A", a);

let b = totalCalPerElf
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(sum, 0);
console.log("🚀 -> Part B", b);
