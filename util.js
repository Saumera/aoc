const path = require('path');
const fs = require('fs');

const { getStrings } = require('./parsers.js');

exports.getProblem = (year, fileName, parse=getStrings) => {
  const contents = fs.readFileSync(path.resolve(__dirname, year, 'problems', fileName)).toString();
  return parse(contents);
}

exports.sum = arr => arr.reduce((s, n) => s + n);
exports.min = arr => arr.reduce((m, n) => n < m ? n : m);
exports.max = arr => arr.reduce((m, n) => n > m ? n : m);
exports.within = (val, min, max) => val >= min && val <= max;

exports.binarySearch = (arr, val) => {
  const search = (left, right) => {
    if (left > right) return null;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return val;
    if (arr[mid] < val) return search(mid + 1, right);
    return search(left, mid - 1);
  }

  return search(0, arr.length - 1);
}

exports.replace = (arr, i, val) => {
  const getter = (typeof val === "function") ? val : () => val;
  return [ ...arr.slice(0, i), getter(arr[i], arr, i), ...arr.slice(i + 1) ];
}
