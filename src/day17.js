import _ from 'lodash';
import { getInput } from './helper.js';
import assert from 'node:assert';

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

let input = getInput('day17');

const rock1 = {
  cells: [
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
  ],
  height: 1,
};
const rock2 = {
  cells: [
    { x: 3, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 3, y: 0 },
  ],
  height: 3,
};
const rock3 = {
  cells: [
    { x: 4, y: 2 },
    { x: 4, y: 1 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ],
  height: 3,
};
const rock4 = {
  cells: [
    { x: 2, y: 3 },
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 0 },
  ],
  height: 4,
};
const rock5 = {
  cells: [
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  height: 2,
};
const jets = testInput;

const printGrid = (grid) => {
  //   _.forEachRight(grid, (row) => {
  //     console.log('|' + row.join('') + '|');
  //   });
  for (let y = grid.length - 1; y >= 0; y--) {
    let row = grid[y];
    console.log('|' + row.join('') + '|');
  }
  console.log('+-------+');
};

const canMoveDown = (rock, grid) => {
  return _.every(rock.cells, (cell) => {
    if (cell.y === 0 || grid[cell.y - 1][cell.x] === '#') {
      return false;
    }
    return true;
  });
};

const canMoveRight = (rock, grid) => {
  return _.every(rock.cells, (cell) => {
    if (cell.x + 1 === 7 || grid[cell.y][cell.x + 1] === '#') {
      return false;
    }
    return true;
  });
};

const canMoveLeft = (rock, grid) => {
  return _.every(rock.cells, (cell) => {
    if (cell.x - 1 === -1 || grid[cell.y][cell.x - 1] === '#') {
      return false;
    }
    return true;
  });
};

const moveRock = (rock, grid, jetIndex) => {
  let newRock = _.cloneDeep(rock);
  //   newRock.cells.forEach((cell) => {
  //     grid[cell.y][cell.x] = '@';
  //   });
  //   printGrid(grid);

  let jet = jets[jetIndex % jets.length];
  if (jet === '<' && canMoveLeft(newRock, grid)) {
    newRock.cells.forEach((cell) => {
      cell.x -= 1;
    });
  } else if (jet === '>' && canMoveRight(newRock, grid)) {
    newRock.cells.forEach((cell) => {
      cell.x += 1;
    });
  }

  let canMove = false;
  if (canMoveDown(newRock, grid)) {
    newRock.cells.forEach((cell) => {
      cell.y -= 1;
    });
    canMove = true;
  }

  //   newRock.cells.forEach((cell) => {
  //     grid[cell.y][cell.x] = '@';
  //   });
  //   rock.cells.forEach((cell) => {
  //     grid[cell.y][cell.x] = '.';
  //   });

  rock.cells = newRock.cells;
  //   printGrid(grid);
  return canMove;
};

const dropRock = (grid, rockTemplate, jetIndex) => {
  let rock = _.cloneDeep(rockTemplate);

  let startingPos = 3;
  for (let i = grid.length - 1; i >= 0; i--) {
    if (grid[i].some((cell) => cell === '#')) {
      startingPos = i + 4;
      break;
    }
  }

  rock.cells.forEach((cell) => {
    cell.y += startingPos;
  });

  //add extra rows to grid
  let extraRows = rock.height - (grid.length - startingPos);
  for (let i = 0; i < extraRows; i++) {
    grid.push(Array(7).fill('.'));
  }

  let rockCanMove = true;

  while (rockCanMove) {
    rockCanMove = moveRock(rock, grid, jetIndex);
    jetIndex++;
  }
  //replace falling icon '@' with rock icon '#'
  rock.cells.forEach((cell) => {
    grid[cell.y][cell.x] = '#';
  });
  return jetIndex;
};

const getHeight = (grid) => {
  let height = 0;
  for (let i = grid.length - 1; i >= 0; i--) {
    if (grid[i].some((cell) => cell === '#')) {
      height = i + 1;
      break;
    }
  }
  return height;
};

const doIt = (grid, noOfRocks, noOfBaseRows, noOfRepeatRows) => {
  let rocks = [rock1, rock2, rock3, rock4, rock5];
  let jetIndex = 0;
  let noOfBaseRocks = 0;
  for (let rockIndex = 0; rockIndex < noOfRocks; rockIndex++) {
    if (rockIndex % 1000 === 1) {
      console.log(Math.round((rockIndex / noOfRocks) * 100) + '%', rockIndex);
    }
    jetIndex = dropRock(grid, rocks[rockIndex % rocks.length], jetIndex);
    let height = getHeight(grid);
    if (height >= noOfBaseRows && noOfBaseRocks === 0) {
      noOfBaseRocks = rockIndex;
      console.log('no of rocks in base:', rockIndex);
    }
    if (height >= noOfBaseRows + noOfRepeatRows - 1) {
      console.log(rockIndex, rockIndex - noOfBaseRocks);
      return { noOfBaseRocks, rocksPerCycle: rockIndex - noOfBaseRocks };
    }
  }

  return getHeight(grid);
};

const findRepeat = (grid) => {
  for (let start = 0; start < grid.length; start++) {
    if (start % 100 == 0) console.log(start);
    for (let length = 2; length <= grid.length / 2; length++) {
      let first = grid.slice(start, start + length);
      let second = grid.slice(start + length, start + length * 2);
      if (_.isEqual(first, second)) {
        let third = grid.slice(length * 2, length * 3);
        if (_.isEqual(first, third)) {
          console.log(first.length);
          console.log(
            `first: ${start} -> ${start + length - 1}, second: ${
              start + length
            } -> ${start + length * 2 - 1}`
          );
          return { length, start };
        }
      }
    }
  }
};

// let grid = Array(3)
//   .fill()
//   .map(() => Array(7).fill('.'));

// let a = doIt(grid, 2022);
// console.log('🚀 -> Part 1', a);

// Part 2
let grid3 = Array(3)
  .fill()
  .map(() => Array(7).fill('.'));
doIt(grid3, 10000);

let { start, length } = findRepeat(grid3);
console.log('🚀 -> repeatAfter', start, length);
let grid2 = Array(3)
  .fill()
  .map(() => Array(7).fill('.'));
let { noOfBaseRocks, rocksPerCycle } = doIt(grid2, length * 3, start, length);

console.log('🚀 -> cycle', noOfBaseRocks, rocksPerCycle);

let targetB = 1000000000000 - noOfBaseRocks;
let noOfCycles = Math.floor(targetB / rocksPerCycle);
console.log('🚀 -> Number of cycles', noOfCycles);
let rocksAtEnd = targetB % rocksPerCycle;
console.log('🚀 -> rocksAtEnd', rocksAtEnd);
let grid4 = Array(3)
  .fill()
  .map(() => Array(7).fill('.'));
let remainingHeight = doIt(grid4, rocksAtEnd);
console.log('🚀 -> remainingHeight', remainingHeight);
let b = noOfCycles * length + remainingHeight + start;

//1585632181181 too low
console.log('🚀 -> Part 2, ', b);
// assert(b > 1585632181181 && b < 1586543988086);

assert(b == 1514285714288, 1514285714288 - b);
