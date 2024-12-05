const { getProblem } = require('../util.js');

const makeParser = parseLine => input => input.split(/\n/gi).filter(Boolean).map(parseLine)

exports.getProblem = (day, parseLine=String) => getProblem(
    '2024',
    `day${day}.txt`,
    makeParser(parseLine)
);

exports.runSolution = (part1, part2) => {
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2()}`);
}
