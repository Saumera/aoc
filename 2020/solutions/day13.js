const { getProblem, min, mult, sum } = require('../../util.js');

const parse = contents => {
  const [time, busses] = contents.split(/\n/).filter(Boolean);
  return {
    time,
    busses: busses.split(','),
  }
}

const { time, busses } = getProblem('2020', 'day13.txt', parse);

// Part 1
const shortestBus = busses.filter(b => b !== 'x').map(Number).reduce((o, bus) => {
  const wait = bus - (time % bus);
  return wait < o.wait ? { bus, wait } : o
}, { bus: null, wait: Infinity });

const part1 = shortestBus.bus * shortestBus.wait;

// Part 2

const modInverse = (num, mod) => Array(Number(mod))
  .fill()
  .map((v, i) => BigInt(i))
  .find(i => (i * num) % mod === BigInt(1))

const remainders = busses
  .map((b, i) => b === 'x' ? null : { mod: BigInt(b), remainder: BigInt(b - (i % b)) })
  .filter(Boolean);

const modProduct = (remainders.map(b => b.mod)).reduce((t, n) => t * n);

const nums = remainders.map(({ mod, remainder }) => {
  const Ni = modProduct / mod;
  const Mi = modInverse(Ni % mod, mod);
  return remainder * Ni * Mi;
})

const part2 = sum(nums) % modProduct;

console.log(part1)
console.log(part2);
