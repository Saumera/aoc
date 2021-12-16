const { getProblem } = require('../helpers');

const getStr = (i, j) => `${i},${j}`
const setRisk = (map, i, j, v) => map[getStr(i, j)] = Math.min((map[getStr(i,j)] ?? Infinity), v);
const insertInPlace = (arr, v) => {
  const binSearch = (target, l=0, r=arr.length - 1) => {
    // If there's no matching risk, use the left index as the insertion point
    if (l > r) return l;
    const mid = Math.floor((l + r) / 2);
    if (arr[mid][1] === target) return mid;
    return (arr[mid][1] > target)
      ? binSearch(target, l, mid - 1)
      : binSearch(target, mid + 1, r)
  }

  const index = binSearch(v[1]);
  arr.splice(index, 0, v);
}

const runDay = rawInput => {
  const findMinPath = (input) => {
    const allCoords = input.map((r, i) => r.map((_, j) => getStr(i, j))).flat(2);
    const unvisited = new Set(allCoords)
    const isValidCoord = ([i, j]) => i >= 0 && i < input.length && j >= 0 && j < input[0].length
    const getNeighbors = (i, j) => [[i+1, j], [i-1, j], [i, j+1], [i, j-1]].filter(isValidCoord);

    const END = getStr(input.length - 1, input[0].length - 1);
    const risks = { [getStr(0,0)]: 0 };
    const queue = [ [getStr(0, 0), 0] ];

    while (unvisited.size && queue.length) {
      const [node, risk] = queue.shift();
      if (!unvisited.has(node)) continue;
      if (node === END) return risks[node];

      unvisited.delete(node);

      getNeighbors(...node.split(',').map(Number))
        .filter(([i, j]) => unvisited.has(getStr(i, j)))
        .forEach(([i, j]) => {
          const risk = risks[node] + input[i][j];
          setRisk(risks, i, j, risk)
          insertInPlace(queue, [getStr(i, j), risk])
        })
    }
  }

  const part1 = findMinPath(rawInput)

  const part2 = (() => {
    const inc = (v, i) => ((v + i) % 10) + Math.floor((v + i) / 10);
    const size = 5;
    const tesselateRow = (row, size) => [ ...Array(size).keys() ]
      .map(i => row.map(val => inc(val, i)))
      .flat(2);
    const tesselateTile = (rows, size) => rows.map(row => tesselateRow(row, size));
    const input = [ ...Array(size).keys() ].map(i => {
      const tile = rawInput.map(r => r.map(v => inc(v, i)))
      return tesselateTile(tile, size)
    }).flat(1)
    return findMinPath(input)
  })()

  console.log(part1);
  console.log(part2);
}

const parse = str => str.split(/\n/).filter(Boolean).map(r => r.split('').map(Number));

const problem = getProblem(15, parse)
runDay(problem);
