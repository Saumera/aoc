const { getProblem } = require('../helpers');

const printGrid = grid => console.log(grid.map(l => l.join('')).join("\n"));

const countDots = grid => grid.flat(2).filter(Boolean).length;

const runDay = input => {
  const [rawCoords, folds] = input;
  const coords = rawCoords.map(c => c.split(',').map(Number));
  const maxX = Math.max(...coords.map(([x]) => x)) + 1;
  const maxY = Math.max(...coords.map(([_,y]) => y)) + 1;
  const startGrid = [ ...Array(maxY) ].map(_ => Array(maxX).fill(0))
  coords.forEach(([x, y]) => startGrid[y][x] = 1);

  const instructions = folds.map(str => str.replace('fold along ', '').split('='));

  const fold = (grid, direction, index) => ({
    y: (grid, index) => grid
      .slice(0, index)
      .map((row, i) => row.map((v, j) => grid[index + (index - i)]?.[j] || v)),
    x: (grid, index) => grid.map((row, i) => row.slice(0, index).map((v, j) => {
      return grid[i][index + (index - j)] || v
    }))
  })[direction](grid, index)

  const part1 = (() => {
    const [direction, index] = instructions[0];
    const grid = fold(startGrid, direction, Number(index))
    return countDots(grid);
  })()

  const part2 = (() => {
    const grid = instructions.reduce((g, [dir, i]) => fold(g, dir, Number(i)), startGrid);
    printGrid(grid.map(r => r.map(v => v ? "#" : ".")));
  })()

  console.log(part1);
}

const parse = str => str.split(/\n\n/g).filter(Boolean).map(l => l.split(/\n/g).filter(Boolean));
const problem = getProblem(13, parse);
runDay(problem)
