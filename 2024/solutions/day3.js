const { getProblem, runSolution } = require('../helpers.js');

const input = getProblem(3).join('');

const mulReg = new RegExp(/mul\((?<left>\d{1,3}),(?<right>\d{1,3})\)/, "gi");

const getMulSum = str => [...str.matchAll(mulReg)]
    .map(m => Number(m.groups.left) * Number(m.groups.right))
    .reduce((sum, num) => sum + num, 0);

const part1 = () => getMulSum(input);

const part2 = () => {
    // The first element will be everything up to the first "don't()", which is valid
    // Everything after will be a collection of strings following a "don't()"
    const [start, ...donts] = input.split('don\'t()');
    const doString = start + donts
        .filter(l => l.indexOf('do()') !== -1)
        // since we know a "don't()" started this string, we're only interested
        // in the substring after a "do()"
        .map(l => l.slice(l.indexOf('do()')))
        .join();

    return getMulSum(doString);
}

runSolution(part1, part2);
