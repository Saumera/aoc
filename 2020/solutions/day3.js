const { getProblem } = require('../../util.js');

const trees = getProblem('2020', 'day3.txt');

const countTrees = (right, down) => trees
  .filter((row, i) => i % down === 0)
  .map((row, i) => row[(right * i) % row.length ])
  .filter(c => c === '#')
  .length;

const part1 = countTrees(3, 1);

const part2 = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
  .map(([ right, down ]) => countTrees(right, down))
  .reduce((t, n) => t * n);

console.log(part1);
console.log(part2);
