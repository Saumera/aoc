const { getProblem, replace } = require('../../util.js');

const parseStep = /^(?<op>[a-z]{3}) (?<inc>[+-]\d+)$/
const parse = contents => contents
  .split(/\n/)
  .filter(Boolean)
  .map(l => l.match(parseStep).groups)
  .map(s => ({ ...s, inc: Number(s.inc) }));

const program = getProblem('2020', 'day8.txt', parse);

const getVal = {
  acc: (total, inc) => total + inc,
  jmp: (total) => total,
  nop: (total) => total,
}

const getPointer = {
  acc: (curr) => curr + 1,
  jmp: (curr, inc) => curr + inc,
  nop: (curr) => curr + 1,
}

// Part 1
const getRepeat = () => {
  const visited = Array(program.length).fill(false);

  const visit = (total, pos) => {
    const { op, inc } = program[pos];
    const next = getPointer[op](pos, inc);
    const newTotal = getVal[op](total, inc);
    if (visited[next]) return newTotal;
    visited[pos] = true;
    return visit(newTotal, next);
  }

  return visit(0, 0);
}

const part1 = getRepeat();

// Part 2

const swapOp = step => ({ ...step, op: (step.op === "jmp" ? "nop" : "jmp") });
const tries = program
  .map((s, i) => i)
  .filter(i => program[i].op !== "acc")
  .map(i => replace(program, i, swapOp))

const getValidTotal = newProgram => {
  const visited = Array(newProgram.length).fill(false);

  const visit = (total, pos) => {
    if (!newProgram[pos]) return total;
    if (visited[pos]) return null;
    const { op, inc } = newProgram[pos];
    visited[pos] = true;
    return visit(getVal[op](total, inc), getPointer[op](pos, inc))
  };

  return visit(0, 0)
}

const part2 = tries.map(getValidTotal).find(Boolean);

console.log(part1);
console.log(part2);
