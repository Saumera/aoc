const { getProblem, sum } = require('../../util.js');

const parse = contents => contents.split(/\n/gi).map(row => row.split(''))
const chart = getProblem('2020', 'day11.txt', parse);

// Takes care of boundary issues
const getSeat = (curr, row, col) => {
  if (row < 0 || row >= curr.length) return null;
  if (col < 0 || col >= curr[row].length) return null;
  return curr[row][col];
};

const compareCharts = (c1, c2) => c1.every((r, i) => r.every((_, j) => c1[i][j] === c2[i][j]));

const getStableOccupied = (willOccupy, willEmpty) => {
  const getNewSeat = (curr, row, col) => {
    if (willOccupy(curr, row, col)) return "#";
    if (willEmpty(curr, row, col)) return "L";
    return curr[row][col];
  }

  const updateChart = curr => curr.map((row, i) => row.map((col, j) => getNewSeat(curr, i, j)));

  const updateUntilStable = (curr) => {
    const updated = updateChart(curr);
    // Inefficient but I'm lazy and computers are fast
    if (compareCharts(curr, updated)) return curr;
    return updateUntilStable(updated);
  };

  return sum(updateUntilStable(chart).map(r => r.filter(v => v === '#').length))
}

// Part 1
const part1 = () => {
  const getAdjacent = (curr, row, col) => [
    getSeat(curr, row - 1, col - 1),
    getSeat(curr, row - 1, col),
    getSeat(curr, row - 1, col + 1),
    getSeat(curr, row, col - 1),
    getSeat(curr, row, col + 1),
    getSeat(curr, row + 1, col - 1),
    getSeat(curr, row + 1, col),
    getSeat(curr, row + 1, col + 1),
  ]

  const occNeighbors = (curr, row, col) => getAdjacent(curr, row, col)
    .filter(v => (v || "") === "#")
    .length;

  const willOccupy = (curr, row, col) => getSeat(curr, row, col) === "L" && !occNeighbors(curr, row, col);
  const willEmpty = (curr, row, col) => getSeat(curr, row, col) === "#" && occNeighbors(curr, row, col) >= 4;

  return getStableOccupied(willOccupy, willEmpty);
}

const part2 = () => {
  // Will recursively reach out a certain direction until it either runs out of
  // seats or finds an empty/occupied one.
  const findSeat = (curr, row, col, dirY, dirX) => {
    const seat = getSeat(curr, row + dirY, col + dirX)
    if (!seat) return null;
    if (seat && ["#", "L"].includes(seat)) return seat;
    return findSeat(curr, row + dirY, col + dirX, dirY, dirX)
  }

  const getSightAdjacent = (curr, row, col) => [
    findSeat(curr, row, col, -1, -1),
    findSeat(curr, row, col, -1, 0),
    findSeat(curr, row, col, -1, 1),
    findSeat(curr, row, col, 0, -1),
    findSeat(curr, row, col, 0, 1),
    findSeat(curr, row, col, 1, -1),
    findSeat(curr, row, col, 1, 0),
    findSeat(curr, row, col, 1, 1),
  ]

  const occNeighbors = (curr, row, col) => getSightAdjacent(curr, row, col)
    .filter(v => (v || "") === "#")
    .length;

  const willOccupy = (curr, row, col) => getSeat(curr, row, col) === "L" && !occNeighbors(curr, row, col)
  const willEmpty = (curr, row, col) => getSeat(curr, row, col) === "#" && occNeighbors(curr, row, col) >= 5

  return getStableOccupied(willOccupy, willEmpty)
}

console.log(part1());
console.log(part2());
