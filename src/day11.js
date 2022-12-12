import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const parseInput = (input) => {
  return input.split(/\n\n/).map((monkey) => {
    let [name, ...rest] = monkey.split(/\n/);
    let [startingItems, operation, test, ifTrue, ifFalse] = rest;
    let items = startingItems
      .split(': ')[1]
      .split(', ')
      .map((x) => parseInt(x));
    operation = operation.split(': ')[1].replace('new', 'item');
    test = test.split(': ')[1].replace('divisible by', 'item % ');
    ifTrue = parseInt(ifTrue.split(': ')[1].replace('throw to monkey ', ''));
    ifFalse = parseInt(ifFalse.split(': ')[1].replace('throw to monkey ', ''));
    return {
      items,
      operation,
      test,
      ifTrue,
      ifFalse,
      inspected: 0,
    };
  });
};

const doMonkeyTurn = (part) => {
  const calcWorryLevel =
    part == 'a' ? (item) => Math.floor(item / 3) : (item) => item % 9699690;
  return (monkey, index, all) => {
    let { items, operation, test, ifTrue, ifFalse } = monkey;
    let newItems = [];
    items.forEach((old) => {
      let item;
      eval(operation);
      item = calcWorryLevel(item);
      let throwTo = eval(test) == 0 ? ifTrue : ifFalse;
      if (all[throwTo].items == undefined) {
        all[throwTo].items = [];
      }
      all[throwTo].items.push(item);
      all[index].inspected++;
    });
    all[index].items = [];
  };
};

let input = getInput('day11');

const partA = () => {
  let monkeys = parseInput(input);
  for (let round = 1; round <= 20; round++) {
    monkeys.forEach(doMonkeyTurn('a'));
  }
  let a = _.chain(monkeys)
    .sortBy('inspected')
    .reverse()
    .slice(0, 2)
    .map((x) => x.inspected)
    .reduce((a, b) => a * b, 1)
    .value();

  console.log('🚀 -> Part 1', a);
};

const partB = () => {
  let monkeys = parseInput(input);
  for (let round = 1; round <= 10000; round++) {
    monkeys.forEach(doMonkeyTurn('b'));
  }
  let b = _.chain(monkeys)
    .sortBy('inspected')
    .reverse()
    .slice(0, 2)
    .map((x) => x.inspected)
    .reduce((a, b) => a * b, 1)
    .value();
  console.log('🚀 -> Part 2', b);
};

partA();
partB();
