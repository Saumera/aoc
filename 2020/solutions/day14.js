const { getProblem, sum } = require('../../util.js');

const instructions = getProblem('2020', 'day14.txt');

const maskRegex = /^mask = (?<mask>[01X]+)$/;
const inputRegex = /^mem\[(?<address>\d+)\] = (?<value>\d+)$/;
const maskGroups = instructions.reduce((arr, step) => {
  const mask = step.match(maskRegex);
  if (mask) return [ ...arr, [ mask.groups.mask ] ];
  const input = step.match(inputRegex).groups;
  const lastGroup = arr[arr.length - 1];
  return [ ...arr.slice(0, arr.length - 1), [ ...lastGroup, input ] ];
}, []);

// Part 1
const max = BigInt(2 ** 36) - BigInt(1);
const getNewVal = mask => {
  const clear = BigInt(`0b${mask.replace(/X/g, '1')}`);
  const set = BigInt(`0b${mask.replace(/X/g, '0')}`);

  return (val) => BigInt(val) & clear | set
}
const res = maskGroups.reduce((outer, group) => {
  const [ mask, ...values ] = group;
  const setBits = getNewVal(mask);

  return values.reduce((inner, v) => ({ ...inner, [v.address]: setBits(v.value) }), outer)
}, {});

const part1 = sum(Object.values(res).map(v => BigInt(v)));

// Part 2
const getMasks = mask => {
  const xCount = mask.split('').filter(c => c === 'X').length;
  const bins = Array(2 ** xCount).fill().map((_, i) => {
    return Array(xCount).fill().map((_, j) => !!(i & 1 << (xCount - j - 1)))
  })

  const getMask = booleans => {
    const clear = booleans.reduce((v, bit) => v.slice(0).replace('X', bit ? "1" : "0"), mask.slice(0).replace(/0/g, "1"));
    const set = booleans.reduce((v, bit) => v.slice(0).replace('X', bit ? "1" : "0"), mask);

    return v => BigInt(v) & BigInt(`0b${clear}`) | BigInt(`0b${set}`);
  }

  return bins.map(getMask);
}

const part2 = () => {
  let memory = {};

  maskGroups.forEach(group => {
    const [ mask, ...values ] = group;
    const masks = getMasks(mask);

    values.forEach(({ address, value }) => {
      masks.forEach(fn => memory[fn(address)] = BigInt(value))
    })
  })

  return sum(Object.values(memory));
}

console.log(part1)
console.log(part2());
