const { getProblem, max } = require('../../util.js');

const rowCol = /^(?<row>[FB]+)(?<col>[LR]+)$/;

const parseRow = val => parseInt(val.replace(/F/g, '0').replace(/B/g, '1'), 2);
const parseCol = val => parseInt(val.replace(/L/g, '0').replace(/R/g, '1'), 2);
const parse = contents => contents
  .split(/\n/)
  .filter(Boolean)
  .map(pass => pass.match(rowCol).groups)
  .map(pass => ({
    row: parseRow(pass.row),
    col: parseCol(pass.col)
  }));

const passes = getProblem('2020', 'day5.txt', parse);

// Part 1
const getId = pass => pass.row * 8 + pass.col;
const part1 = max(passes.map(getId));

// Part 2
const allIds = passes.map(getId).sort((a, b) => a - b);
const part2 = allIds.find((id, i) => allIds[i + 1] === id + 2) + 1;

console.log(part1);
console.log(part2);
