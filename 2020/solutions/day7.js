const { getProblem } = require('../../util.js');

const outer = /^(?<bagType>(\w\s?)+) bags$/;
const inner = /^(?<count>[0-9]+) (?<bagType>(\w\s?)+) bags?\.?$/;

const parseRule = rule => {
  const [bag, contains] = rule.split(' contain ');
  const { bagType } = bag.match(outer).groups;
  return {
    bagType,
    contains: (contains === 'no other bags.' ? [] : contains.split(', '))
      .map(rule => rule.match(inner).groups)
  }
}

const parser = contents => contents.split(/\n/gi).filter(Boolean).map(parseRule);
const rules = getProblem('2020', 'day7.txt', parser);

// Part 1
const containedBy = rules.reduce((outer, bag) => {
  return bag.contains.reduce((inner, { bagType }) => ({
    ...inner,
    [bagType]: [ ...(inner[bagType] || []), bag.bagType ]
  }), outer)
}, {});
const findAllParents = (bagType) => {
  const parents = containedBy[bagType] || [];
  return parents.concat(...parents.map(b => findAllParents(b)));
}
const part1 = new Set(findAllParents('shiny gold')).size

// Part 2
const canContain = rules.reduce((o, { bagType, contains }) => ({ ...o, [bagType]: contains }), {});

const countChildren = (bagType) => {
  if (!canContain[bagType] || !canContain[bagType].length) return 0;
  return canContain[bagType].reduce((c, { bagType: b, count }) => {
    return c + Number(count) + Number(count) * countChildren(b)
  }, 0)
}
const part2 = countChildren('shiny gold');

console.log(part1);
console.log(part2);

