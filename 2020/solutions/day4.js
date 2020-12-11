const { getProblem, within } = require('../../util.js');

const regex = /^(?<field>[a-z]+):(?<value>.+)$/;
const parse = contents => contents
  .split(/\n\n/gi)
  .map(c => c.split(/\n|\s/gi).filter(Boolean).map(f => f.match(regex).groups))

const passports = getProblem('2020', 'day4.txt', parse);

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const hasAllRequired = passport => {
  const fieldNames = new Set(passport.map(f => f.field));
  return required.every(field => fieldNames.has(field));
}
const part1 = passports.filter(hasAllRequired).length;

const heightRegex = /^(?<number>[0-9]+)(?<units>[incm]+)$/;
const hairColorRegex = /^#[0-9a-f]{6}$/;
const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
const pidRegex = /^[0-9]{9}$/
const policies = {
  byr: val => within(Number(val), 1920, 2002),
  iyr: val => within(Number(val), 2010, 2020),
  eyr: val => within(Number(val), 2020, 2030),
  hgt: val => {
    const { number, units } = (val.match(heightRegex) || {}).groups || {};
    if (!number || !units) return false;
    const bounds = units === "cm" ? [150, 193] : [59, 76];
    return within(Number(number), ...bounds);
  },
  hcl: val => val.match(hairColorRegex),
  ecl: val => eyeColors.has(val),
  pid: val => val.match(pidRegex),
}

const part2 = passports
  .filter(hasAllRequired)
  .map(passport => passport.reduce((o, { field, value }) => ({ ...o, [field]: value }), {}))
  .filter(passport => required.every(f => policies[f](passport[f])))
  .length;

console.log(part1);
console.log(part2);

