const { getProblem } = require('../helpers');

// A helper method for adding a number to a counter object and handling new/updated values.
// Both mutates the object and returns it for use in forEach or reduce loops.
const add = (o, k, v) => {
  o[k] = (o[k] ?? 0) + v;
  return o
}

const runDay = input => {
  const [letters, rawSteps] = input;
  const steps = rawSteps.split("\n").map(s => s.split(' -> ').filter(Boolean)).filter(n => n.length);
  const insertion = {};
  steps.forEach(s => insertion[s[0]] = s[1]);
  // We have to track the pair counts and the character counts separately since they overlap
  const startPairCount = letters.split('').reduce((o, c, i) => (i === 0
    ? o
    : add(o, letters[i - 1] + c, 1)
  ), {});
  const startCharCounts = letters.split('').reduce((o, c) => add(o, c, 1), {})

  const runSteps = (numSteps, pairCount = startPairCount, charCounts = startCharCounts) => {
    if (numSteps === 0) return charCounts;
    const updatedPairs = {};
    const updatedCharCounts = { ...charCounts };
    Object.entries(pairCount).forEach(([pair, count]) => {
      // If no pair is found, just copy the pair count to the new object
      if (!insertion[pair]) return void add(updatedPairs, pair, count);

      // If a pair is found, create two new pairs using the inserted character, and add
      // the current pair count to each pair.
      const left = pair[0] + insertion[pair];
      const right = insertion[pair] + pair[1];
      add(updatedPairs, left, count);
      add(updatedPairs, right, count);

      // And finally add the new character's count to the character count map.
      add(updatedCharCounts, insertion[pair], count);
    })
    return runSteps(numSteps - 1, updatedPairs, updatedCharCounts)
  }

  // Part 1
  const part1 = (() => {
    const charCounts = runSteps(10);
    return Math.max(...Object.values(charCounts)) - Math.min(...Object.values(charCounts));
  })()

  // Part 2
  const part2 = (() => {
    const charCounts = runSteps(40);
    return Math.max(...Object.values(charCounts)) - Math.min(...Object.values(charCounts));
  })();

  console.log(part1);
  console.log(part2);
}

const parse = str => str.split(/\n\n/g).filter(Boolean);
const problem = getProblem(14, parse);
runDay(problem);
