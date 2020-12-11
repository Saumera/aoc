const { getProblem } = require('../../util.js');

// Part 1
const part1 = numbers => numbers.reduce((res, n, i) => {
  return res || n * (numbers.slice(i).find(m => n + m === 2020 ?? 0) ?? 0)
}, 0);

// Part 2
const part2 = numbers => numbers.reduce((res, n, i) => {
  return res || n * (numbers.slice(i).reduce((res2, m, j) => {
    return res2 || m * (numbers.slice(j).find(l => n + m + l === 2020 ?? 0) ?? 0)
  }, 0) ?? 0)
}, 0)

async function main() {
  const parse = contents => contents.split(/\n/gi).map(Number)
  const numbers = await getProblem('2020', 'day1.txt', parse);
  console.log(part1(numbers));
  console.log(part2(numbers));
}

main();
