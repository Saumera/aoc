const { getProblem } = require('../helpers');

const runDay = input => {
  const { xMin, xMax, yMin, yMax } = input;

  const getMaxHeight= (xVel, yVel, x=0, y=0, maxHeight=0) => {
    if (x > xMax || y < yMin) return null;
    if (x >= xMin && y <= yMax) return maxHeight;
    return getMaxHeight(
      Math.max(xVel - 1, 0), // xVel
      yVel - 1, // yVel
      x + xVel, // x
      y + yVel, // y
      Math.max(maxHeight, y + yVel) // max height
    )
  }

  // Brute force baybeee
  const pairs = [ ...Array(xMax + 1).keys() ]
    .map(x => [ ...Array(yMin * -1 * 2 + 1).keys() ].map(y => [x, y + yMin]))
    .flat(1);

  const part1 = Math.max(...pairs.map(([x, y]) => getMaxHeight(x, y)).filter(v => v !== null))
  const part2 = pairs.filter(([x, y]) => getMaxHeight(x, y) !== null).length

  console.log(part1);
  console.log(part2);
}

const regex = /^target area: x=(?<xMin>-?[0-9]+)\.\.(?<xMax>-?[0-9]+), y=(?<yMin>-?[0-9]+)\.\.(?<yMax>-?[0-9]+)$/;
const parse = str => {
  const { groups } = regex.exec(str.trim());
  return {
    xMin: Number(groups.xMin),
    xMax: Number(groups.xMax),
    yMin: Number(groups.yMin),
    yMax: Number(groups.yMax)
  }
}

const problem = getProblem(17, parse);
runDay(problem)

