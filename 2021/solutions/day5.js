const { getProblem } = require('../helpers.js');

const lines = getProblem(5);
const segments = lines.map(line => line.split(" -> ").map(end => end.split(',').map(Number)))

const getStartGrid = segs => {
  const max = Math.max(...segs.flat(2));
  return [ ...new Array(max + 1) ].map(_ => {
    return [ ...new Array(max + 1) ].map(_ => 0);
  })
}

const markGrid = (grid, x, y) => {
  grid[y][x]++;
  return grid
}
const markSegment = (grid, seg) => {
  const diffX = Math.abs(seg[0][0] - seg[1][0]);
  const diffY = Math.abs(seg[0][1] - seg[1][1]);
  const slopeX = diffX > 0 ? (seg[1][0] - seg[0][0]) / diffX : 0;
  const slopeY = diffY > 0 ? (seg[1][1] - seg[0][1]) / diffY : 0;
  const coords = [ ...new Array(Math.max(diffX, diffY) + 1) ].map((_, i) => [
    seg[0][0] + (i * slopeX),
    seg[0][1] + (i * slopeY)
  ])
  return coords.reduce((g, c) => markGrid(g, c[0], c[1]), grid);
}

const getOverlaps = (startGrid, segments) => {
  const markSegments = (grid, remainingSegments) => {
    if (!remainingSegments.length) return grid;
    const [seg, ...remaining] = remainingSegments;
    return markSegments(markSegment(grid, seg), remaining);
  }

  const finalGrid = markSegments(startGrid, segments);
  return finalGrid.flat().filter(c => c >= 2).length;
}

const part1 = (() => {
  const filtered = segments.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);
  return getOverlaps(getStartGrid(filtered), filtered);
})()

const part2 = getOverlaps(getStartGrid(segments), segments);

console.log(part1);
console.log(part2);
