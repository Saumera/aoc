const { getProblem, runSolution } = require('../helpers.js');

const parseLine = str => str.split('');
const input = getProblem(4, parseLine);

// test case
/*
const test = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
const input = test.split(/\n/gi).filter(Boolean).map(l => l.split(''));
*/

// helper values
const height = input.length;
const width = input[0].length
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]

// helper methods
const isInBounds = (i, j) => i >= 0 && i < height && j >= 0 && j < width;

const checkDirection = (i, j, dir) => {
    const nextLetters = ['M', 'A', 'S'];
    return nextLetters.every((letter, index) => {
        // e.g. if i,j is 16,24 and dir is [-1, -1], M should be at 15,23
        // A should be at 14,22 and S should be at 13,21.
        const i2 = i + dir[0] * (index + 1);
        const j2 = j + dir[1] * (index + 1);
        return isInBounds(i2, j2) && input[i2][j2] === letter;
    })
}
// If we have an X, we can check all 8 directions for M, then A, then S.
const countValidAnswers = (i, j) => directions.filter(dir => checkDirection(i, j, dir)).length;

const part1 = () => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] !== 'X') continue;
            count += countValidAnswers(i, j);
        }
    }
    return count;
}

const part2 = () => {
    const diagonals = [
        [[-1,-1], [1,1]],
        [[-1,1], [1,-1]],
    ];
    const valid = ['M', 'S'];
    const getLetter = (i, j, dir) => {
        const i2 = i + dir[0];
        const j2 = j + dir[1];
        if (!isInBounds(i2, j2)) return '';
        return valid.includes(input[i2][j2]) ? input[i2][j2] : '';
    }
    const isValidDiagonal = (i, j, corners) => {
        const letters = corners.map(corner => getLetter(i, j, corner)).join('');
        return letters.length === 2 && letters[0] !== letters[1];
    }
    const isValidXmas = (i, j) => diagonals.every(diagonal => isValidDiagonal(i, j, diagonal));

    let count = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] !== 'A' || !isValidXmas(i, j)) continue;
            count++;
        }
    }
    return count;
}

runSolution(part1, part2)
