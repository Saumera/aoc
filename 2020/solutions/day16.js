const { getProblem, within, sum } = require('../../util.js');

const parseField = /^(?<name>(\w\s?)+): (?<ranges>.*)$/
const parseRange = /^(?<min>\d+)\-(?<max>\d+)$/

const parse = contents => contents.split(/\n\n/);
const [ rawFields, myTicket, rawTickets ] = getProblem('2020', 'day16.txt', parse);

const fields = rawFields.split("\n").map(f => {
  const { name, ranges } = f.match(parseField).groups;
  const rangeFunctions = ranges.split(' or ').map(range => {
    const { min, max } = range.match(parseRange).groups;
    return (val) => within(val, Number(min), Number(max));
  });

  return {
    name,
    isValid: val => rangeFunctions.some(fn => fn(val)),
  }
})

const tickets = rawTickets.split("\n").slice(1).map(ticket => ticket.split(',').map(Number))

const part1 = () => {
  const allValidators = fields.map(f => f.isValid);
  const valueIsValid = (val) => allValidators.some(fn => fn(val))
  const getInvalidValues = ticket => sum(ticket.filter(v => !valueIsValid(v))) || 0;

  return sum(tickets.map(getInvalidValues))
}

const part2 = () => {
  const allValidators = fields.map(f => f.isValid);
  const valueIsValid = val => allValidators.some(fn => fn(val));

  const validTickets = tickets.filter(t => t.filter(v => !valueIsValid(v)).length === 0);

  const columns = Array(fields.length)
    .fill()
    .map((v, i) => validTickets.map(ticket => ticket[i]));

  // To find which columns go with which fields, we have to eliminate them one by one
  // since many columns are valid for multiple fields at once. This algorithm will find
  // which field matches exactly one column, record it, and remove it from contention before
  // looping. This is done until all columns are assigned to fields.
  let availableCols = Array(columns.length).fill().map((v, i) => i)
  const fieldToCol = {};

  while (availableCols.length) {
    const field = fields
      .map((field, i) => ({
        name: field.name,
        cols: availableCols.filter(c => columns[c].every(field.isValid))
      }))
      .find(({ cols }) => cols.length === 1);

    fieldToCol[field.name] = field.cols[0];
    availableCols = availableCols.filter((c) => c !== field.cols[0]);
  }

  const mine = myTicket.split("\n")[1].split(',').map(Number);

  const departureFields = [
    'departure location',
    'departure station',
    'departure platform',
    'departure track',
    'departure date',
    'departure time',
  ]
  return departureFields
    .map(name => fieldToCol[name])
    .map(col => mine[col])
    .reduce((t, n) => t * n)
}

console.log(part1());
console.log(part2())
