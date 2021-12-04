const { getProblem } = require('../helpers.js');

const numStrings = getProblem(3)
const numbers = numStrings.map(n => parseInt(n, 2));
const numBits = [ ...new Array(numStrings[0].length) ].map((_, i) => i);

const getBit = (n, bit) => (n & (1 << bit)) >> bit;
const flipBit = val => (val + 1) % 2;
const getBitCounts = (nums, i) => {
  const counts = { 0: 0, 1: 0 }
  nums.map(n => getBit(n, i)).forEach(n => counts[n]++)
  return counts;
}

const gamma = numBits
  .map(bit => getBitCounts(numbers, bit))
  .reduce((num, counts, i) => num | (parseInt(counts[1] / counts[0])) << i, 0)
const epsilon = numBits.reduce((num, i) => num | (flipBit(getBit(gamma, i)) << i), 0)

// Part 1
const part1 = gamma * epsilon

// Part2
const part2 = (() => {
  const getVal = (operation, bit=numStrings[0].length - 1, candidates=numbers) => {
    if (candidates.length === 1) return candidates[0];
    const counts = getBitCounts(candidates, bit);
    const target = operation === "gt"
      ? (counts[0] > counts[1] ? 0 : 1)
      : (counts[0] <= counts[1] ? 0 : 1);
    return getVal(operation, bit - 1, candidates.filter(n => getBit(n, bit) === target));
  }

  const oxygen = getVal("gt");
  const co2 = getVal("lt");
  return oxygen * co2
})()

console.log(part1);
console.log(part2);
