const { getProblem } = require("../helpers.js");

const parse = str => str.split(/\n/g).filter(Boolean).map(l => l.split('').map(Number));
const octopuses = getProblem(11, parse);

const isValid = (i, j) => i >= 0 && i < octopuses.length && j >= 0 && j < octopuses[0].length;
const getNeighbors = (i, j) => [-1, 0, 1]
  .map(incI => [-1, 0, 1].map(incJ => [i + incI, j + incJ]))
  .flat()
  .filter(([newI, newJ]) => (newI !== i || newJ !== j) && isValid(newI, newJ))

// BFS
const flash = (grid, stack, seen = new Set()) => {
  if (!stack.length) return grid;
  const [i, j] = stack.pop();
  grid[i][j]++;
  if (grid[i][j] > 9 && !seen.has(`${i},${j}`)) {
    getNeighbors(i, j).forEach(pair => stack.push(pair));
    seen.add(`${i},${j}`)
  }
  return flash(grid, stack, seen);
}

const countFlashed = (grid, steps, flashedCount = 0) => {
  if (steps === 0) return flashedCount;
  const flashed = new Set();
  const copy = grid.map(r => r.map(n => n + 1));
  copy.forEach((r, i) => r.forEach((n, j) => {
    (n > 9) && flash(copy, [[i, j]], flashed);
  }))
  const updated = copy.map(r => r.map(n => n <= 9 ? n : 0))
  const count = updated.map(r => r.filter(n => n === 0)).flat().length;
  return countFlashed(updated, steps - 1, flashedCount + count);
}

// Part 1
const part1 = countFlashed(octopuses, 100);

// Part 2
const part2 = (() => {
  const findAllFlashed = (grid, stepCount = 0) => {
    const flashed = new Set();
    const copy = grid.map(r => r.map(n => n + 1));
    copy.forEach((r, i) => r.forEach((n, j) => {
      (n > 9) && flash(copy, [[i, j]], flashed)
    }));
    const updated = copy.map(r => r.map(n => n <= 9 ? n : 0));
    const allFlashed = updated.every(r => r.every(n => n === 0));
    if (allFlashed) return stepCount + 1;
    return findAllFlashed(updated, stepCount + 1);
  }
  return findAllFlashed(octopuses)
})()

console.log(part1);
console.log(part2);
