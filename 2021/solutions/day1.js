const { getProblem } = require('../../util.js');
const { getNumbers } = require('../../parsers.js');

const numbers = getProblem('2021', 'day1.txt', getNumbers);

// Part 1
const part1 = numbers.reduce((total, n, i) => {
  return total + ((i !== 0 && n > numbers[i - 1]) ? 1 : 0)
}, 0)

// Part 2
const getSum = i => i < numbers.length - 3 ? numbers[i] + numbers[i + 1] + numbers[i + 2] : 0;
const part2 = numbers.reduce((total, n, i) => {
  return total + ((i !== 0 && getSum(i) > getSum(i - 1)) ? 1 : 0);
}, 0)

// Solution
console.log(part1);
console.log(part2)
