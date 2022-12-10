import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

let input = getInput('day9');

const move = (direction, { x, y }) => {
  switch (direction) {
    case 'U':
      y++;
      break;
    case 'D':
      y--;
      break;
    case 'L':
      x--;
      break;
    case 'R':
      x++;
      break;
  }
  return { x, y };
};

const calculateDistance = ({ x, y }, { x2, y2 }) => {
  const dist = Math.floor(Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2)));
  return dist;
};

const isTooFar = ({ x, y }, { x2, y2 }) => {
  return Math.abs(x - x2) > 1 || Math.abs(y - y2) > 1;
};

const print = (visited) => {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  visited.forEach((key) => {
    let [x, y] = key.split(',').map((n) => parseInt(n));
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  let grid = [];
  for (let y = maxY; y >= minY; y--) {
    let row = [];
    for (let x = minX; x <= maxX + 1; x++) {
      if (x === 0 && y === 0) row.push('s');
      else row.push(visited.has(`${x},${y}`) ? '#' : '.');
    }
    grid.push(row);
  }
  console.log(grid.map((row) => row.join('')).join('\n'));
  console.log(' ');
};

const moveTail = ({ x, y }, { tailX, tailY }) => {
  if (x === tailX || y === tailY) {
    if (!isTooFar({ x, y }, { x2: tailX + 1, y2: tailY })) {
      tailX++;
    } else if (!isTooFar({ x, y }, { x2: tailX - 1, y2: tailY })) {
      tailX--;
    } else if (!isTooFar({ x, y }, { x2: tailX, y2: tailY + 1 })) {
      tailY++;
    } else {
      tailY--;
    }
  } else {
    if (!isTooFar({ x, y }, { x2: tailX + 1, y2: tailY + 1 })) {
      tailX++;
      tailY++;
    } else if (!isTooFar({ x, y }, { x2: tailX + 1, y2: tailY - 1 })) {
      tailX++;
      tailY--;
    } else if (!isTooFar({ x, y }, { x2: tailX - 1, y2: tailY + 1 })) {
      tailX--;
      tailY++;
    } else {
      tailX--;
      tailY--;
    }
  }
  return { tailX, tailY };
};

const executeMoves = (motions, noOfKnots) => {
  let visited = new Set();
  visited.add(`0,0`);
  let knots = _.range(noOfKnots).map((i) => ({ x: 0, y: 0 }));
  for (let motion of motions) {
    let { direction, distance } = motion;
    for (let i = 0; i < distance; i++) {
      //move head
      let { x, y } = knots[0];
      ({ x, y } = move(direction, { x, y }));
      knots[0] = { x, y };
      //move all tails if needed
      for (let k = 1; k < knots.length; k++) {
        let { x: tailX, y: tailY } = knots[k];
        let { x: prevX, y: prevY } = knots[k - 1];
        let distance = calculateDistance(
          { x: prevX, y: prevY },
          { x2: tailX, y2: tailY }
        );
        if (distance > 1) {
          ({ tailX, tailY } = moveTail(
            { x: prevX, y: prevY },
            { tailX, tailY }
          ));
        }
        knots[k] = { x: tailX, y: tailY };
        if (k === knots.length - 1) {
          visited.add(`${tailX},${tailY}`);
        }
      }
    }
  }
  //   print(visited);
  return visited;
};

let motions = input
  .split(/\n/)
  .map((line) => line.split(' '))
  .map(([direction, distance]) => ({
    direction,
    distance: parseInt(distance),
  }));
let a = executeMoves(motions, 2).size;
console.log('🚀 -> Part 1', a);

let b = executeMoves(motions, 10).size;
console.log('🚀 -> Part 2', b);
