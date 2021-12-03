const { getProblem } = require('../util.js');
const { getStrings } = require('../parsers.js');

exports.getProblem = (day, parse=getStrings) => getProblem('2021', `day${day}.txt`, parse);
