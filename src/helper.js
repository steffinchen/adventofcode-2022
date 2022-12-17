import { readFileSync } from 'fs';

export const getInput = (filename) => {
  return readFileSync(`./data/${filename}.txt`).toString();
};

export const sum = (a, b) => a + b;

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

/**
 *
 * @param {object} graph object with each key being a node, and each value being an object with an array of neighbors
 * @param {string} target the name of the target node
 * @param {string} root the name of the root node
 * @returns the shortest path from root to target
 */
export const bfs = (graph, target, root) => {
  const queue = [];
  queue.push(root);

  const discovered = [];
  // discovered[root] = true;

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
    let neighbors = graph[node].neighbors;
    neighbors.forEach((neighbor) => {
      console.log('🚀 -> neighbors.forEach -> edges[neighbor]', edges[node]);
      if (edges[node] < 15) {
        // if (!discovered[neighbor]) {
        //   discovered[neighbor] = true;
        queue.push(neighbor);
        edges[neighbor] = edges[node] + 1;
        predecessors[neighbor] = node;
      }
    });
  }
  return false;
};
