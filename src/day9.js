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
U 2
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
      else row.push(visited.includes(`${x},${y}`) ? '#' : '.');
    }
    grid.push(row);
  }
  console.log(grid.map((row) => row.join('')).join('\n'));
  console.log(' ');
};

/**
 * Moves the head by one step and
 * the tail by one step if the distance
 * between the head and the tail is greater than 1.
 * @param {*} direction
 * @param {*} {x,y} coordinates of the head
 * @param {*} {x,y} coordinates of the tail
 * @returns the new x,y coordinates of the head and tail
 */
const moveTail = (direction, { x, y }, { tailX, tailY }) => {
  if (x === tailX || y === tailY) {
    ({ x: tailX, y: tailY } = move(direction, { x: tailX, y: tailY }));
  } else {
    // let diffX = x - tailX;
    // let diffY = y - tailY;
    // if (x - tailX >= 2) {
    //   tailX++;
    // } else if (tailX - x >= 2) {
    //   tailX--;
    // } else if (y - tailY >= 2) {
    //   tailY++;
    // } else if (tailY - y >= 2) {
    //   tailY--;
    // }
    switch (direction) {
      case 'U':
        tailY++;
        tailX = x;
        break;
      case 'D':
        tailY--;
        tailX = x;
        break;
      case 'L':
        tailX--;
        tailY = y;
        break;
      case 'R':
        tailX++;
        tailY = y;
        break;
    }
  }

  return { tailX, tailY };
};

const executeMoves = (motions, noOfKnots) => {
  let visited = [];
  visited.push(`0,0`);
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
        // console.log(knots);
        let distance = calculateDistance(
          { x: prevX, y: prevY },
          { x2: tailX, y2: tailY }
        );

        if (distance > 1) {
          ({ tailX, tailY } = moveTail(
            direction,
            { x: prevX, y: prevY },
            { tailX, tailY }
          ));
        }
        if (k === knots.length - 1) {
          visited.push(`${tailX},${tailY}`);
          //   console.log(tailX, tailY, 'x,y', x, /y);
        }
        knots[k] = { x: tailX, y: tailY };
        // if (k == 1) console.log('head ', knots[k]);
        // console.log(visited);
      }
      // print(visited);
    }
  }
  return visited;
};

let motions = input
  .split(/\n/)
  .map((line) => line.split(' '))
  .map(([direction, distance]) => ({
    direction,
    distance: parseInt(distance),
  }));
let a = _.chain(executeMoves(motions, 2)).uniq().value().length;
console.log('🚀 -> Part 1', a);

// let b = _.chain(executeMoves(motions, 10)).uniq().value().length;
// console.log('🚀 -> Part 2', b);
