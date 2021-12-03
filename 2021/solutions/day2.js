const { getProblem } = require('../helpers.js');

const parse = contents => contents.split(/\n/gi)
  .filter(Boolean)
  .map(line => line.split(' '))
  .map(step => ({ direction: step[0], amount: Number(step[1]) }))

const steps = getProblem(2, parse);

const part1 = (() => {
  const stepsByDirection = {
    forward: (pos, amount) => ({ ...pos, x: pos.x + amount }),
    up: (pos, amount) => ({ ...pos, y: pos.y - amount }),
    down: (pos, amount) => ({ ...pos, y: pos.y + amount }),
  }

  const start = { x: 0, y: 0 }
  const position = steps.reduce((pos, step) => {
    return stepsByDirection[step.direction](pos, step.amount)
  }, start);
  return position.x * position.y;
})()

const part2 = (() => {
  const stepsByDirection = {
    forward: (pos, amount) => ({ ...pos, x: pos.x + amount, y: pos.y + (pos.aim * amount) }),
    down: (pos, amount) => ({ ...pos, aim: pos.aim + amount }),
    up: (pos, amount) => ({ ...pos, aim: pos.aim - amount }),
  }

  const start = { x: 0, y: 0, aim: 0 };
  const position = steps.reduce((pos, step) => {
    return stepsByDirection[step.direction](pos, step.amount)
  }, start);
  return position.x * position.y;
})();

console.log(part1);
console.log(part2);
