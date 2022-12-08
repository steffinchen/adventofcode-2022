import _ from 'lodash';
import { getInput, sum } from './helper.js';

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const transformInput = (string) => {
  let currentDir = '';
  let result = {};
  string.split(/\n/).map((line) => {
    if (line.startsWith('$ cd ')) {
      let target = line.replace('$ cd ', '');
      if (target === '..') {
        currentDir = goUpOneDir(currentDir);
      } else {
        currentDir =
          currentDir +
          (target.startsWith('/') || currentDir.endsWith('/') ? '' : '/') +
          target;
      }
    } else if (line.startsWith('$ ls')) {
      result[currentDir] = [];
    } else {
      let [size, name] = line.split(' ');
      if (size !== 'dir') {
        result[currentDir].push({ size, name });
      }
    }
  });
  return result;
};

const goUpOneDir = (dir) => dir.split('/').slice(0, -1).join('/');

let input = getInput('day7');

let sizePerDir = _.chain(transformInput(input))
  .mapValues((files) => files.map((file) => file.size))
  .mapValues((sizes) => sizes.map((size) => parseInt(size)))
  .mapValues(_.sum)
  .value();

let keys = Object.keys(sizePerDir);

let summedUpSizes = {};
keys.forEach((dir) => {
  let total = keys
    .filter((key) => key.startsWith(dir))
    .map((key) => sizePerDir[key])
    .reduce(sum);
  summedUpSizes[dir] = total;
});
let a = Object.values(summedUpSizes)
  .filter((size) => size <= 100000)
  .reduce(sum);

console.log('🚀 -> Part 1', a);

const totalDiskSpace = 70000000;
const updateNeeds = 30000000;
const freeSpace = totalDiskSpace - summedUpSizes['/'];
const needToFree = updateNeeds - freeSpace;

let b = _.chain(summedUpSizes)
  .pickBy((size) => size >= needToFree)
  .values()
  .min()
  .value();

console.log('🚀 -> Part 2', b);
