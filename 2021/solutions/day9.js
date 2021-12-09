const { getProblem } = require("../helpers");

const heatmap = getProblem(9).map(l => l.split('').map(Number));

const isLowPoint = (i, j) => {
  const val = heatmap[i][j];
  return val < (heatmap[i][j-1] ?? 10) &&
    val < (heatmap[i][j+1] ?? 10) &&
    val < (heatmap[i-1]?.[j] ?? 10) &&
    val < (heatmap[i+1]?.[j] ?? 10);
}

const isValidCoord = (i, j) => i >= 0 && i < heatmap.length && j >= 0 && j < heatmap[0].length;
const countBasin = ([i, j]) => {
  const seen = new Set();
  const updateSeen = (v, r, c) => {
    if (!isValidCoord(r, c)) return;
    const val = heatmap[r][c];
    if (val === 9 || val <= v || seen.has(`${r},${c}`)) return;
    seen.add(`${r},${c}`);
    updateSeen(val, r - 1, c);
    updateSeen(val, r + 1, c);
    updateSeen(val, r, c - 1);
    updateSeen(val, r, c + 1);
  }

  updateSeen(-1, i, j);
  return seen.size;
}

// Part 1
const part1 = heatmap
  .map((l, i) => l.filter((_, j) => isLowPoint(i, j)))
  .flat(2)
  .reduce((sum, v) => sum + v + 1, 0)

// Part 2
const part2 = heatmap
  .reduce((pairs, l, i) => l.reduce((pairs2, _, j) => {
    return isLowPoint(i, j) ? [ ...pairs2, [i, j] ] : pairs2;
  }, pairs), [])
  .map(countBasin)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((n, size) => n * size, 1);

console.log(part1);
console.log(part2);
