import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

let input = getInput('day12');

let start;
let possibleStarts = [];
let target;

const toKey = (x, y) => `${x},${y}`;

const parseInput = (input) => {
  return input.split(/\n/).map((line, y) => {
    return line.split('').map((node, x) => {
      if (node === 'S') {
        start = toKey(x, y);
        node = 'a';
      } else if (node === 'E') {
        target = toKey(x, y);
        node = 'z';
      }
      if (node == 'a') possibleStarts.push(toKey(x, y));
      return node.charCodeAt(0);
    });
  });
};

const createGraph = (topo) => {
  let graph = {};
  topo.forEach((row, y) => {
    row.forEach((node, x) => {
      let neighbors = [];
      if (topo[y - 1]?.[x]) {
        if (topo[y - 1][x] <= node + 1) neighbors.push(toKey(x, y - 1));
      }
      if (topo[y + 1]?.[x]) {
        if (topo[y + 1][x] <= node + 1) neighbors.push(toKey(x, y + 1));
      }
      if (topo[y]?.[x - 1]) {
        if (topo[y][x - 1] <= node + 1) neighbors.push(toKey(x - 1, y));
      }
      if (topo[y]?.[x + 1]) {
        if (topo[y][x + 1] <= node + 1) neighbors.push(toKey(x + 1, y));
      }
      graph[toKey(x, y)] = neighbors;
    });
  });
  return graph;
};

const buildPath = (target, root, predecessors) => {
  const stack = [];
  stack.push(target);
  let u = predecessors[target];
  while (u != root) {
    stack.push(u);
    u = predecessors[u];
  }
  stack.push(root);
  let path = stack.reverse().join(' -> ');
  return path;
};

const bfs = (graph, target, root) => {
  const queue = [];
  queue.push(root);

  const discovered = [];
  discovered[root] = true;

  const edges = [];
  edges[root] = 0;

  const predecessors = [];
  predecessors[root] = null;

  while (queue.length) {
    let node = queue.shift();
    if (node === target) {
      return {
        distance: edges[target],
        path: buildPath(target, root, predecessors),
      };
    }
    let neighbors = graph[node];
    neighbors.forEach((neighbor) => {
      if (!discovered[neighbor]) {
        discovered[neighbor] = true;
        queue.push(neighbor);
        edges[neighbor] = edges[node] + 1;
        predecessors[neighbor] = node;
      }
    });
  }
  return false;
};

let topo = parseInput(input);
let graph = createGraph(topo);
console.log('🚀 -> graph', graph);
let a = bfs(graph, target, start);
console.log('🚀 -> Part 1', a.distance);

let b = _.chain(possibleStarts)
  .map((start) => bfs(graph, target, start).distance)
  .min()
  .value();

console.log('🚀 -> Part 2', b);
