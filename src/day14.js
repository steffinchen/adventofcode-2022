import _ from "lodash";
import { getInput } from "./helper.js";

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

let input = getInput("day14");

const createGrid = (allX, allY) => {
  //find min and max
  let minX = Math.min(...allX);
  let maxX = Math.max(...allX);
  let minY = Math.min(...allY);
  let maxY = Math.max(...allY);
  //create grid
  let grid = [];
  for (let y = minY; y <= maxY; y++) {
    let row = [];
    for (let x = minX; x <= maxX; x++) {
      if (grid[y] === undefined) {
        grid[y] = [];
      }
      grid[y][x] = ".";
    }
    // grid[y](row);
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
    grid[y][x] = "#";
    x += dx;
    y += dy;
  }
};

let points = testInput
  .split(/\n/)
  .map((line) => line.split(" -> "))
  .map((rock) => rock.map((point) => point.split(",").map(Number)));

let allX = _.uniq(points.flatMap((rock) => rock.map((point) => point[0])));
let allY = _.uniq(points.flatMap((rock) => rock.map((point) => point[1])));

let grid = createGrid(allX, allY);
console.log("🚀 -> file: day14.js:51 -> grid", grid);

let a = points.reduce((grid, rock) => {
  rock.forEach((point, i) => {
    if (i > 0) {
      drawLine(grid, point, rock[i - 1]);
    }
  });
  return grid;
}, []);

console.log("🚀 -> Part 1", a);

let b = "";
console.log("🚀 -> Part 2", b);
