// Today there is no input text file, just a few numbers
const INPUT = [2, 0, 6, 12, 1, 3];
const END = 2020;

const getNthSpoken = (nth) => {
  const seen = INPUT.reduce((o, v, i) => ({ ...o, [v]: i + 1 }), {});

  let turn = INPUT.length + 1;
  let last = INPUT[INPUT.length - 1];
  while (turn <= nth) {
    const spoken = seen[last] ? (turn - 1) - seen[last] : 0;
    seen[last] = turn - 1;
    last = spoken;
    turn++;
  }

  return last;
}

const part1 = getNthSpoken(2020);
console.log(part1);

const part2 = getNthSpoken(30000000)
console.log(part2);
