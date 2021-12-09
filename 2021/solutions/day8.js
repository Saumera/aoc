const { getProblem } = require('../helpers.js');

const parseDigit = d => d.split('').sort().join('')
const parse = str => str.split(/\n/g).filter(Boolean).map(line => {
  return line.split(' | ').map(sets => sets.split(' ').filter(Boolean).map(parseDigit));
})
const lines = getProblem(8, parse);

const part1 = (() => {
  const outputs = lines.map(([_, out]) => out);
  return outputs.reduce((count, digits) => {
    return count + digits.filter(d => [2, 3, 4, 7].includes(d.length)).length
  }, 0)
})()

const contains = (str, sub) => sub.split('').every(c => str.includes(c))
const part2 = (() => {
  const getLookup = (digits) => {
    const numStrings = Array(10).fill('');
    // first we get the easy ones
    numStrings[1] = digits.find(d => d.length === 2);
    numStrings[7] = digits.find(d => d.length === 3);
    numStrings[4] = digits.find(d => d.length === 4);
    numStrings[8] = digits.find(d => d.length === 7);

    // let's look through digits of length 6: 0, 6, 9
    const sixes = digits.filter(d => d.length === 6);
    numStrings[9] = sixes.find(d => contains(d, numStrings[4]));
    numStrings[6] = sixes.find(d => !contains(d, numStrings[1]));
    numStrings[0] = sixes.find(d => d !== numStrings[9] && d !== numStrings[6]);

    // Now let's look through digits of length 5: 2, 3, 5
    const fives = digits.filter(d => d.length === 5);
    numStrings[3] = fives.find(d => contains(d, numStrings[1]));
    numStrings[5] = fives.find(d => contains(numStrings[6], d));
    numStrings[2] = fives.find(d => d !== numStrings[3] && d !== numStrings[5]);

    return numStrings.reduce((o, s, i) => ({ ...o, [s]: i }), {})
  }

  const getNumber = ([input, output]) => {
    const lookup = getLookup(input);
    return output.reduce((n, s) => (n * 10) + lookup[s], 0)
  }

  return lines.reduce((total, line) => total + getNumber(line), 0);
})()

console.log(part1)
console.log(part2);
