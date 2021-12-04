const { getProblem } = require('../helpers.js');

const parse = contents => contents.split(/\n\n/gi).filter(Boolean);
const [rawOrder, ...rawBoards] = getProblem(4, parse)

const drawOrder = rawOrder.split(',').map(Number);
const boards = rawBoards.map(b => {
  return b.split(/\n/gi)
    .filter(Boolean)
    .map(l => l.split(' ').filter(Boolean).map(Number))
})

const MARKED = -1;
const isMarked = v => v === MARKED;
const markValue = (board, i, j) => [
  ...board.slice(0, i),
  [ ...board[i].slice(0, j), MARKED, ...board[i].slice(j + 1), ],
  ...board.slice(i + 1)
]
const checkPos = (b, i, j, val) => b[i][j] === val ? markValue(b, i, j) : b;
const checkBoard = (board, val) => {
  const rowLen = board[0].length;
  const coords = [].concat(...board).map((_, i) => ([parseInt(i / rowLen), i % rowLen]));
  return coords.reduce((b, [i, j]) => checkPos(b, i, j, val), board);
}

const checkRow = row => row.every(isMarked)
const checkCol = (board, col) => board.map(r => r[col]).every(isMarked)
const isBingo = board => board.some(checkRow) || board[0].some((_, col) => checkCol(board, col));

const getSum = board => [].concat(...board).filter(v => !isMarked(v)).reduce((sum, v) => sum + v);

const part1 = (() => {
  const drawNumbers = (draws, allBoards) => {
    const [num, ...remaining] = draws;
    const updatedBoards = allBoards.map(b => checkBoard(b, num));
    const found = updatedBoards.find(b => isBingo(b));
    if (found) return getSum(found) * num;
    return drawNumbers(remaining, updatedBoards);
  }

  return drawNumbers(drawOrder, boards);
})()

const part2 = (() => {
  const getLastBingo = (board, draws) => {
    const [num, ...remaining] = draws;
    const updated = checkBoard(board, num);
    if (isBingo(updated)) return getSum(updated) * num;
    return getLastBingo(updated, remaining);
  }

  const getLastBoard = (draws, remainingBoards) => {
    const [num, ...remaining] = draws;
    const updatedBoards = remainingBoards
      .map(b => checkBoard(b, num))
      .filter(b => !isBingo(b));
    if (updatedBoards.length === 1) return getLastBingo(updatedBoards[0], remaining)
    return getLastBoard(remaining, updatedBoards);
  }

  return getLastBoard(drawOrder, boards);
})()

console.log(part1);
console.log(part2);
