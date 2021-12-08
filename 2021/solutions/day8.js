const { getProblem } = require('../helpers.js');

const parse = str => str.split(/\n/g).filter(Boolean).map(line => {
  return line.split(' | ').map(sets => sets.split(' ').filter(Boolean).map(num => new Set(num.split(''))))
})
const lines = getProblem(8, parse);

const part1 = (() => {
  const outputs = lines.map(([_, out]) => out);
  return outputs.reduce((count, digits) => {
    return count + digits.filter(d => [2, 3, 4, 7].includes(d.size)).length
  }, 0)
})()

const diff = (s1, s2) => new Set([
  ...[...s1].filter(c => !s2.has(c)),
  ...[...s2].filter(c => !s1.has(c)),
])

const NUMBERS = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9,
}
const getMissingChar = set => 'abcdefg'.split('').find(c => !set.has(c));
const part2 = (() => {
  const getNumberLookup = (numSets) => {
    const map = 'abcdefg'.split('').reduce((o, c) => ({ ...o, [c]: "" }), {});
    // First we find a 1 and a 4
    const one = numSets.find(s => s.size === 2);
    const four = numSets.find(s => s.size === 4);
    // Then find a 7 and figure out the top line by comparing it to the one.
    map[[...numSets.find(s => s.size === 3)].find(c => !one.has(c))] = 'a';

    const fourDiff = diff(four, one);
    const zero = numSets.find(s => s.size === 6 && fourDiff.has(getMissingChar(s)));
    const missingCharZero = getMissingChar(zero);
    fourDiff.forEach(c => map[c] = c === missingCharZero ? 'd' : 'b')

    const six = numSets.find(s => s.size === 6 && one.has(getMissingChar(s)));
    const missingCharSix = getMissingChar(six);
    one.forEach(c => map[c] = c === missingCharSix ? 'c' : 'f')

    const remaining = new Set(Object.keys(map).filter(k => !map[k]));
    const nine = numSets.find(s => s.size === 6 && remaining.has(getMissingChar(s)));
    const missingCharNine = getMissingChar(nine);
    remaining.forEach(c => map[c] = c === missingCharNine ? 'e' : 'g')

    return numSet => NUMBERS[[...numSet].map(c => map[c]).sort().join('')]
  }

  const getNumber = ([input, output]) => {
    const lookup = getNumberLookup(input);
    return output.reduce((n, s) => (n * 10) + lookup(s), 0)
  }

  return lines.reduce((total, line) => total + getNumber(line), 0);
})()

console.log(part1)
console.log(part2);
