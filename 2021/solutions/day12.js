const { getProblem } = require("../helpers");

const runDay = input => {
  const nodes = {};
  input.forEach(line => {
    const [left, right] = line.split('-');
    nodes[left] = [ ...(nodes[left] ?? []), right ];
    nodes[right] = [ ...(nodes[right] ?? []), left ];
  })
  const isLittle = n => n !== "start" && n === n.toLowerCase()

  const part1 = (() => {
    const countPaths = (node = "start", seen = new Set()) => {
      if (node === 'end') return 1;
      const remaining = nodes[node].filter(n => !seen.has(n) && n !== "start");
      if (!remaining.length) return 0;
      if (isLittle(node)) {
        // Each path gets its own set.
        seen = new Set([ ...seen, node ]);
      }
      return remaining.map(n => countPaths(n, seen)).reduce((sum, c) => sum + c)
    }
    return countPaths();
  })()

  const part2 = (() => {
    const countPaths = (node = "start", seen = new Set(), seenAgain = "") => {
      if (node === "end") return 1;
      if (isLittle(node) && seen.has(node) && !seenAgain) {
        seenAgain = node
      }
      const canVisit = n => n !== "start" && (!seen.has(n) || (!seenAgain && isLittle(n)))
      const remaining = nodes[node].filter(canVisit);
      if (!remaining.length) return 0;
      if (isLittle(node)) seen = new Set([ ...seen, node ]);
      return remaining.map(n => countPaths(n, seen, seenAgain)).reduce((sum, c) => sum + c);
    }
    return countPaths();
  })()

  console.log(part1);
  console.log(part2);
}

const ex1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split(/\n/g).filter(Boolean);

const ex2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split(/\n/).filter(Boolean);

const ex3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split(/\n/g).filter(Boolean);

const problem = getProblem(12);
runDay(problem);
