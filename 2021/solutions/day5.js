const { getProblem } = require('../helpers.js');

const lines = getProblem(5);
const segments = lines.map(line => line.split(" -> ").map(end => end.split(',').map(Number)))
const SIZE = Math.max(...segments.flat(2)) + 1;

const getInc = (s, e) => (e - s) !== 0 ? (e - s) / Math.abs(e - s) : 0;
const interpolate = (s, e, size) => [...Array(size).keys()].map(i => s + (i * getInc(s, e)));
const markSegment = (seg, seen, multiples) => {
  const size = Math.max(Math.abs(seg[0][0] - seg[1][0]), Math.abs(seg[0][1] - seg[1][1])) + 1;
  const xValues = interpolate(seg[0][0], seg[1][0], size);
  const yValues = interpolate(seg[0][1], seg[1][1], size);
  xValues.map((x, i) => x * SIZE + yValues[i]).forEach(val => {
    if (seen.has(val)) multiples.add(val);
    seen.add(val);
  })
}

const getOverlaps = allSegments => {
  const seen = new Set();
  const multiples = new Set();
  allSegments.forEach(seg => markSegment(seg, seen, multiples))
  return multiples.size;
}

const part1 = (() => {
  const filtered = segments.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);
  return getOverlaps(filtered);
})()

const part2 = getOverlaps(segments);

console.log(part1);
console.log(part2);
