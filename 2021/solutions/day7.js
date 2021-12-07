const { getProblem } = require('../helpers.js');

const parse = str => str.split(',').filter(Boolean).map(Number);
const numbers = getProblem(7, parse);

// Part 1
const part1 = (() => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)]
  return sorted.reduce((sum, n) => sum + Math.abs(n - median), 0);
})()

// Part 2
const part2 = (() => {
  const mean = Math.round(numbers.reduce((sum, n) => sum + n) / numbers.length);
  const tries = [mean - 1, mean, mean + 1];
  const calcDistance = n => (n * (n + 1)) / 2;
  const totals = tries.map(t => {
    return numbers.reduce((sum, n) => sum + calcDistance(Math.abs(n - t)), 0)
  })
  return Math.min(...totals);
})()

console.log(part1);
console.log(part2)
