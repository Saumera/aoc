const { getProblem } = require('../../util.js');
const { getNumbers } = require('../../parsers.js');

const numbers = getProblem('2020', 'day1.txt', getNumbers);

// Part 1
const part1 = numbers.reduce((res, n, i) => {
  return res || n * (numbers.slice(i).find(m => n + m === 2020 ?? 0) ?? 0)
}, 0);

// Part 2
const part2 = numbers.reduce((res, n, i) => {
  return res || n * (numbers.slice(i).reduce((res2, m, j) => {
    return res2 || m * (numbers.slice(j).find(l => n + m + l === 2020 ?? 0) ?? 0)
  }, 0) ?? 0)
}, 0)

console.log(part1);
console.log(part2);
