const { getProblem } = require('../helpers');

class Decoder {
  constructor(input) {
    this.input = input;
    this.versionSum = 0;
    this.operations = {
      0: this._getSum,
      1: this._getProduct,
      2: this._getMin,
      3: this._getMax,
      4: this._getLiteral,
      5: this._getGt,
      6: this._getLt,
      7: this._getEqual,
    }
  }

  getValue = () => {
    const [finalIndex, value] = this.readPacket(0);
    return value;
  }

  getVersionSum = () => {
    this.readPacket(0);
    return this.versionSum;
  }

  readPacket = (index) => {
    const version = this._getInt(index, 3);
    this.versionSum += version;
    const operationString = this._getSlice(index + 3, 3);
    if (!operationString) return [index + 3, null];

    const operation = parseInt(operationString, 2);
    return this.operations[operation](index + 6)
  }

  _runUntilIndex = (currIndex, endIndex, values=[]) => {
    if (currIndex >= endIndex) return [currIndex, values];
    const [nextIndex, value] = this.readPacket(currIndex);
    return this._runUntilIndex(nextIndex, endIndex, [...values, value]);
  }
  _runNTimes = (currIndex, count, currCount=0, values=[]) => {
    if (currCount >= count) return [currIndex, values];
    const [nextIndex, value] = this.readPacket(currIndex);
    return this._runNTimes(nextIndex, count, currCount + 1, [...values, value]);
  }
  _makeOperator = handleSubpackets => index => {
    const lengthType = this.input[index];
    const startIndex = index + 1 + (lengthType === "1" ? 11 : 15);
    const [nextIndex, values] = lengthType === "1"
      ? this._runNTimes(startIndex, this._getInt(index + 1, 11))
      : this._runUntilIndex(startIndex, startIndex + this._getInt(index + 1, 15));
    return [nextIndex, handleSubpackets(values)]
  }

  _getSum = this._makeOperator((values) => values.reduce((sum, v) => sum + v, 0))
  _getProduct = this._makeOperator(values => values.reduce((prod, v) => prod * v, 1))
  _getMin = this._makeOperator(values => Math.min(...values))
  _getMax = this._makeOperator(values => Math.max(...values))
  _getGt = this._makeOperator(([first, second]) => first > second ? 1 : 0)
  _getLt = this._makeOperator(([first, second]) => first < second ? 1 : 0)
  _getEqual = this._makeOperator(([first, second]) => first === second ? 1 : 0)

  _getLiteral = (i, str="") => {
    const [bit, ...piece] = this._getSlice(i, 5).split('')
    const updated = str + piece.join('');
    const nextIndex = i + 5;
    if (bit === "0") return [nextIndex, parseInt(updated, 2)];
    return this._getLiteral(nextIndex, updated)
  }

  _getSlice = (start, len) => this.input.slice(start, start + len)
  _getInt= (start, len) => parseInt(this._getSlice(start, len), 2)
}

const runDay = input => {
  const decoder = new Decoder(input);

  const part1 = decoder.getVersionSum();
  const part2 = decoder.getValue();

  console.log(part1);
  console.log(part2);
}

const pad = str => String("0").repeat(4 - str.length) + str;
const parse = str => str.trim().split('')
  .filter(Boolean)
  .map(c => pad(parseInt(c, 16).toString(2)))
  .join('')
const problem = getProblem(16, parse)

runDay(problem)

