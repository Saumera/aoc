const { getProblem, max, sum } = require('../../util.js');
const { getNumbers } = require('../../parsers.js');

const part1 = numbers => {
  const adapters = [ ...numbers, max(numbers) + 3 ].sort((a, b) => a - b);
  const diffs = adapters.reduce((diffs, a, i) => {
    if (i === 0) return diffs;
    const diff = a - adapters[i - 1];
    return { ...diffs, [diff]: (diffs[diff] || 0) + 1 }
  }, {});
  return diffs[3] * diffs[1];
}

const part2 = numbers => {
  const adapters = [ ...numbers, max(numbers) + 3].sort((a, b) => a - b);
  const validNextAdapters = (curr, inc = 1, all = []) => {
    if (curr + inc >= adapters.length) return all;
    if (adapters[curr + inc] - adapters[curr] > 3) return all;
    return validNextAdapters(curr, inc + 1, [ ...all, adapters[curr + inc] ])
  }
  // Will find all adapters within 3 of every adapter, creating a 2d array.
  const neighbors = adapters.map((_, i) => validNextAdapters(i));

  const countConfigurations = (i = adapters.length - 2, totals = {}) => {
    const total = sum(neighbors[i].map(neighbor => totals[neighbor] || 1));
    if (i === 0) return total;
    return countConfigurations(i - 1, { ...totals, [adapters[i]]: total })
  }
  return countConfigurations();
}

async function main() {
  const jolts = await getProblem('2020', 'day10.txt', getNumbers);
  console.log(part1(jolts));
  console.log(part2(jolts));
}

main();
