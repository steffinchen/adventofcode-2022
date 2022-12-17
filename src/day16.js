import _ from 'lodash';
import { getInput, bfs } from './helper.js';

const testInput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

const convertInputToGraph = (input) => {
  return input.split(/\n/).reduce((graph, line) => {
    const [all, valve, flow, tunnels] = line.match(
      /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)/
    );
    graph[valve] = { flow: parseInt(flow), neighbors: tunnels.split(', ') };
    return graph;
  }, {});
};

const findPath = (graph, start, end) => {
  return bfs(graph, start, end);
};

const calcTotalFlow = (path, graph) => {
  return path.reduce((sum, node, i) => {
    if (node === '->') return sum + 1;
    if (graph[node].flow == 0) return sum;
    let t = 30 - i - 1;
    return sum + graph[node].flow * t;
  }, 0);
};

let input = getInput('day16');

let graph = convertInputToGraph(testInput);
console.log('🚀 -> graph', graph);

//find path from AA to every other node
console.log(findPath(graph, 'AA', 'EE'));
// let allPaths = _.chain(graph)
//   .keys()
//   .map((key) => (key == 'AA' ? '' : findPath(graph, key, 'AA')))
//   .filter((el) => el != '')
//   .value();

//ideally, find short(est) path that includes all nodes with flow > 0

// console.log('🚀 -> allPaths', allPaths);
// let a = allPaths
//   .map((el) => el.path)
//   .map((path) => path.split(' '))
//   .map((path) => calcTotalFlow(path, graph));
// console.log('🚀 -> Part 1', a);

let b = '';
console.log('🚀 -> Part 2', b);
