const { getProblem, runSolution } = require('../helpers.js');

const parseLine = str => str.split('   ').map(Number);
const input = getProblem(1, parseLine);

const left = input.map(n => n[0]).flat().sort();
const right = input.map(n => n[1]).flat().sort();

const part1 = () => {
    const getSimilarity = i => Math.abs(left[i] - right[i]);
    return left.reduce((total, n, i) => total + getSimilarity(i), 0);
}

const part2 = () => {
    const rightCount = right.reduce((o, n) => {
        o[n] = ++o[n] || 1;
        return o;
    }, {});

    const getSimilarity = n => n * (rightCount[n] || 0);
    return left.reduce((total, n) => total + getSimilarity(n), 0);
}

runSolution(part1, part2);
