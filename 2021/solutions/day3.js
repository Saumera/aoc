const { getProblem } = require('../helpers.js');

const numbers = getProblem(3);

const gamma = numbers[0].split('').reduce((str, number, i) => {
  const bits = numbers.map(l => l[i]);
  const map = { 0: 0, 1: 0 };
  bits.forEach(b => map[b] = map[b] + 1);
  return str + (map[0] > map[1] ? "0" : "1")
}, '');
const epsilon = gamma.split("").map(b => b === "0" ? "1" : "0").join('');

// Part 1
const part1 = (() => {
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
})()

// Part2
const part2 = (() => {
  const getVal = operation => {
    let filtered = numbers;
    let bit = 0;
    while (filtered.length > 1) {
      const map = { 0: 0, 1: 0 };
      filtered.forEach(line => map[line[bit]] = map[line[bit]] + 1)
      const target = operation === "gt"
        ? (map[0] > map[1] ? "0" : "1")
        : (map[0] <= map[1] ? "0" : "1");
      filtered = filtered.filter(line => line[bit] === target);
      bit++;
    }
    return filtered[0];
  }

  const oxygen = getVal("gt");
  const co2 = getVal("lt");
  return parseInt(oxygen, 2) * parseInt(co2, 2);
})()

console.log(part1);
console.log(part2);
