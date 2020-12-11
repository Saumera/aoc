const { getProblem, sum } = require('../../util.js');

const parse = contents => contents.split(/\n\n/).filter(Boolean).map(group => group.split(/\n/).filter(Boolean));
const groups = getProblem('2020', 'day6.txt', parse);

// Part 1
const groupAnswers = groups.map(group => [ ...(new Set([].concat(...group.map(person => person.split(''))))) ]);
const part1 = sum(groupAnswers.map(answers => answers.length));

// Part 2
const part2 = sum(groups.map((group, i) => groupAnswers[i].filter(a => group.every(person => person.includes(a))).length));

console.log(part1);
console.log(part2);
