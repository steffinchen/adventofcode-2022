import { readFileSync } from "fs";

export const getInput = (filename) => {
  return readFileSync(`./data/${filename}.txt`).toString();
};

export const sum = (a, b) => a + b;
