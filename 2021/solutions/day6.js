const { getProblem } = require('../helpers.js');

const parse = str => str.split(',').filter(Boolean).map(Number)
const numbers = getProblem(6, parse);

const INDEXES = [ ...new Array(9).keys() ]

const startCounts = INDEXES.reduce((o, i) => ({ ...o, [i]: 0 }), {});
numbers.forEach(num => startCounts[num]++)

const getCount = (days, counts=startCounts) => {
  if (days === 0) return Object.values(counts).reduce((sum, count) => sum + count);
  const updated = {};
  INDEXES.forEach(n => updated[n] = counts[n + 1]);
  updated[6] += counts[0];
  updated[8] = counts[0];
  return getCount(days - 1, updated);
}

// Part 1
const part1 = getCount(80)

// Part 2
const part2 = getCount(256)

console.log(part1);
console.log(part2);
