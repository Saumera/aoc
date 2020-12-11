const { getProblem, binarySearch, sum, min, max } = require('../../util.js');
const { getNumbers } = require('../../parsers.js');

const numbers = getProblem('2020', 'day9.txt', getNumbers);

// part 1
const part1 = numbers.find((curr, i) => {
  if (i < 25) return false;
  const sorted = numbers.slice(i - 25, i).filter(v => v < curr).sort((a, b) => a - b);
  return !sorted.find((v, j) => binarySearch(sorted.slice(j + 1), curr - v));
});

// part 2
const getWindowSum = (i, size) => sum(numbers.slice(i, i + size));
const wind = Array(numbers.length - 2)
  .fill()
  .map((v, i) => i + 2)
  .reduce((wind, size) => {
    if (wind) return wind;
    const index = numbers.findIndex((v, i) => getWindowSum(i, size) === part1);
    return index !== -1 ? numbers.slice(index, index + size) : null;
  }, null);
const part2 = max(wind) + min(wind)

console.log(part1);
console.log(part2);
