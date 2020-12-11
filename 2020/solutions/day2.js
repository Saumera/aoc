const { getProblem } = require('../../util.js');

const regex = /^(?<min>[0-9]+)\-(?<max>[0-9]+) (?<letter>[a-z]): (?<password>[a-z]+)$/;
const parse = contents => contents.split(/\n/gi)
  .filter(Boolean)
  .map(line => line.match(regex).groups)

const passwords = getProblem('2020', 'day2.txt', parse);

// Part 1
const part1 = passwords.filter(({ min, max, letter, password }) => {
  const count = password.split('').filter(char => char === letter).length;
  return count >= Number(min) && count <= Number(max);
}).length;

const part2 = passwords.filter(({ min, max, letter, password }) => {
  return [password[Number(min) - 1], password[Number(max  1)]]
    .filter(c => c === letter)
    .length === 1
}).length

console.log(part1);
console.log(part2);
