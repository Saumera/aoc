const { getProblem } = require("../helpers.js");

const lines = getProblem(10);

const openChars = new Set(["[", "{", "<", "("]);
const closeChars = new Set(["}", "]", ")", ">"]);
const closeToOpen = { "}": "{", "]": "[", ">": "<", ")": "(" }
const openToClose = { "{": "}", "[": "]", "<": ">", "(": ")" };

const simplifyChunks = line => {
  let lineArr = line.split('');
  let removed = Infinity;
  while (removed > 0 && lineArr.length) {
    const filtered = lineArr.filter((c, i) => {
      return openToClose[lineArr[i - 1] ?? ""] !== c
        && closeToOpen[lineArr[i + 1] ?? ""] !== c
    });
    removed = lineArr.length - filtered.length;
    lineArr = filtered;
  }
  return lineArr
}

// Part 1
const part1 = (() => {
  const charToVal = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
  const getScore = line => {
    const closeChar = line.find(c => closeChars.has(c));
    return charToVal[closeChar] ?? 0
  }
  return lines.map(simplifyChunks).map(getScore).reduce((sum, v) => sum + v)
})()

// Part 2
const part2 = (() => {
  const charToVal = { ")": 1, "]": 2, "}": 3, ">": 4 }
  const noError = line => line.every(c => openChars.has(c));
  const getScore = line => line
    .reverse()
    .map(c => openToClose[c])
    .reduce((total, c) => (total * 5) + charToVal[c], 0)

  const scores = lines
    .map(simplifyChunks)
    .filter(noError)
    .map(getScore)
    .sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
})()

console.log(part1);
console.log(part2);
