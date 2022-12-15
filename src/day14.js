import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

let input = getInput('day14');

const createGrid = (allX, allY, withFloor) => {
  let minY = Math.min(...allY, 0);
  let maxY = Math.max(...allY) + 2;
  //sand piles up diagonally, so there's limit how wide it can fall
  let minX = Math.min(...allX) - (maxY - minY);
  let maxX = Math.max(...allX) + (maxY - minY);
  let grid = [];
  for (let y = minY; y <= maxY; y++) {
    grid[y] = [];
    for (let x = minX; x <= maxX; x++) {
      if (withFloor && y == maxY) {
        grid[y][x] = '#';
      } else {
        grid[y][x] = '.';
      }
    }
  }
  return grid;
};

const drawLine = (grid, [x1, y1], [x2, y2]) => {
  let x = x1;
  let y = y1;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = Math.max(Math.abs(dx), Math.abs(dy));
  dx /= steps;
  dy /= steps;
  for (let i = 0; i <= steps; i++) {
    grid[y][x] = '#';
    x += dx;
    y += dy;
  }
};

const printGrid = (grid) => {
  grid.forEach((row) => {
    console.log(row.join(''));
  });
};

const pourSand = (grid) => {
  let counter = 0;
  let maxY = grid.length + 2;
  let y = 0;

  while (y < maxY && grid[0][500] !== 'o') {
    let x = 500;
    let falling = true;
    while (falling && y < maxY) {
      //move 1 down
      if (grid[y + 1]?.[x] == undefined || grid[y + 1][x] === '.') {
        y++;
      } else {
        //move left or right
        if (grid[y + 1][x - 1] == undefined || grid[y + 1][x - 1] === '.') {
          y++;
          x--;
        } else if (
          grid[y + 1][x + 1] == undefined ||
          grid[y + 1][x + 1] === '.'
        ) {
          y++;
          x++;
        } else {
          grid[y][x] = 'o';
          counter++;
          falling = false;
          y = 0;
        }
      }
    }
  }
  // printGrid(grid);
  return counter;
};

const createCave = (withFloor) => {
  let points = input
    .split(/\n/)
    .map((line) => line.split(' -> '))
    .map((rock) => rock.map((point) => point.split(',').map(Number)));

  let allX = _.uniq(points.flatMap((rock) => rock.map((point) => point[0])));
  let allY = _.uniq(points.flatMap((rock) => rock.map((point) => point[1])));

  let grid = createGrid(allX, allY, withFloor);

  return points.reduce((grid, rock) => {
    rock.forEach((point, i) => {
      if (i > 0) {
        drawLine(grid, point, rock[i - 1]);
      }
    });
    return grid;
  }, grid);
};

let cave = createCave(false);
let a = pourSand(cave);
console.log('🚀 -> Part 1', a);

let caveWithFloor = createCave(true);
let b = pourSand(caveWithFloor);
console.log('🚀 -> Part 2', b);
