const path = require('path');
const fs = require('fs');

const { getString: DEFAULT_PARSE } = require('./parsers.js');

exports.getProblem = async (year, fileName, parse=DEFAULT_PARSE) => {
  const contents = fs.readFileSync(path.resolve(__dirname, year, 'problems', fileName)).toString();
  return parse(contents);
}

exports.sum = arr => arr.reduce((s, n) => s + n);
exports.min = arr => arr.reduce((m, n) => n < m ? n : m);
exports.max = arr => arr.reduce((m, n) => n > m ? n : m);
