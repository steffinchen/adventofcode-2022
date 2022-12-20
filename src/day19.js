import _ from 'lodash';
import { getInput } from './helper.js';

const testInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian. 
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

let input = getInput('day19');

let blueprints = testInput.split(/\n/).map((line) => {
  let [name, recipe] = line.split(': ');
  let bluePrint = { name };
  recipe.split('. ').forEach((bot) => {
    if (!bot) return;
    let result = bot.match(
      /Each ([a-z]+) robot costs (?<ore>\d+) ore( and (?<clay>)\d+ clay)?( and (?<obsidian>\d+) obsidian)?/
    );

    bluePrint[result[1] + 'Bot'] = _.mapValues(result.groups, (value) =>
      value ? parseInt(value) : 0
    );
  });
  return bluePrint;
});
console.log('🚀 -> blueprints -> blueprints', blueprints);

const createNewState = (state, changes) => {
  return state.map((value, index) => value + changes[index]);
};

const oreIndex = 0,
  clayIndex = 1,
  obsidianIndex = 2,
  geodeIndex = 3,
  oreBotIndex = 4,
  clayBotIndex = 5,
  obsidianBotIndex = 6,
  geodeBotIndex = 7;

const produceResources = (state) => {
  let stateChange = [0, 0, 0, 0, 0, 0, 0, 0];
  stateChange[oreIndex] += state[oreBotIndex];
  stateChange[clayIndex] += state[clayBotIndex];
  stateChange[obsidianIndex] += state[obsidianBotIndex];
  stateChange[geodeIndex] += state[geodeBotIndex];

  return stateChange;
};

const buildGeodeBots = (blueprint) => {
  let initialState = [0, 0, 0, 0, 1, 0, 0, 0];
  const stack = [initialState];
  let counter = 0;

  let done = false;

  while (stack.length > 0) {
    let state = stack.pop();
    counter++;
    console.log(
      `current state has ${state[oreBotIndex]} ore bots,
        ${state[clayBotIndex]} clay bots, ${state[obsidianBotIndex]} obsidian bots,
        ${state[geodeBotIndex]} geode bots; ${state[oreIndex]} ore,
        ${state[clayIndex]} clay, ${state[obsidianIndex]} obsidian,
        ${state[geodeIndex]} geode]}`
    );
    if (
      state[oreIndex] >= blueprint.geodeBot.ore &&
      state[clayIndex] >= blueprint.geodeBot.clay &&
      state[obsidianIndex] >= blueprint.geodeBot.obsidian
    ) {
      let stateChange = produceResources(state);
      stateChange[oreIndex] -= blueprint.geodeBot.ore;
      stateChange[clayIndex] -= blueprint.geodeBot.clay;
      stateChange[obsidianIndex] -= blueprint.geodeBot.obsidian;
      stateChange[geodeBotIndex] += 1;
      console.log(`Depth: ${counter}, building obisidian bot`);
      if (!done) stack.push(createNewState(state, stateChange));
    } else {
      //check if we can produce an ore bot or a clay bot or an obsidian bot
      let canBuild = false;
      if (state[oreIndex] >= blueprint.oreBot.ore) {
        let stateChange = produceResources(state);
        stateChange[oreIndex] -= blueprint.oreBot.ore;
        stateChange[oreBotIndex] += 1;
        if (!done) stack.push(createNewState(state, stateChange));
        console.log(`Depth: ${counter}, building ore bot`);
        canBuild = true;
      }
      if (state[oreIndex] >= blueprint.clayBot.ore) {
        let stateChange = produceResources(state);
        stateChange[oreIndex] -= blueprint.clayBot.ore;
        stateChange[clayBotIndex] += 1;
        if (!done) stack.push(createNewState(state, stateChange));
        console.log(`Depth: ${counter}, building clay bot`);
        canBuild = true;
      }
      if (
        state[oreIndex] >= blueprint.obsidianBot.ore &&
        state[clayIndex] >= blueprint.obsidianBot.clay
      ) {
        let stateChange = produceResources(state);
        stateChange[oreIndex] -= blueprint.obsidianBot.ore;
        stateChange[clayIndex] -= blueprint.obsidianBot.clay;
        stateChange[obsidianBotIndex] += 1;
        if (!done) stack.push(createNewState(state, stateChange));
        console.log(`Depth: ${counter}, building obisidian bot`);
        canBuild = true;
      }
      //   if (!canBuild) {
      let stateChanges = produceResources(state);
      console.log(`Depth: ${counter}, cannot build anything`);
      if (!done) stack.push(createNewState(state, stateChanges));
      //   }
    }
    if (counter >= 12) {
      done = true;
    }
  }
  //find element in stack with most geode
  let maxGeode = 0;
  let maxState = null;
  console.log('stack', stack);
  stack.forEach((state) => {
    if (state[geodeIndex] > maxGeode) {
      maxGeode = state[geodeIndex];
      maxState = state;
    }
  });
  console.log('🚀 -> buildGeodeBots -> maxState', maxState);
  console.log('🚀 -> buildGeodeBots -> maxGeode', maxGeode);
  console.log(
    `best state has ${maxGeode} geodes; ${maxState[oreBotIndex]} ore bots, 
    ${maxState[clayBotIndex]} clay bots, ${maxState[obsidianBotIndex]} obsidian bots, 
    ${maxState[geodeBotIndex]} geode bots; ${maxState[oreIndex]} ore, ${maxState[clayIndex]} clay, ${maxState[obsidianIndex]} obsidian, ${maxState[geodeIndex]} geode]}`
  );
};

buildGeodeBots(blueprints[0]);

let a = '';
console.log('🚀 -> Part 1', a);

let b = '';
console.log('🚀 -> Part 2', b);
