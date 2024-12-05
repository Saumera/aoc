const { getProblem, runSolution } = require('../helpers.js');

const parseLine = str => str.split(' ').map(Number);
const input = getProblem(2, parseLine);

const isValidDiff = (l, r) => Math.abs(l - r) > 0 && Math.abs(l - r) < 4;
const isUp = (l, r) => (r - l) > 0

const isSafe = (n1, n2, n3) => {
    if (!isValidDiff(n1, n2)) return false;
    if (!isValidDiff(n2, n3)) return false;
    // two consecutive diffs going the same direction is all we need. Applied
    // over indeces 2 through n-1 is enough to validate the whole report.
    return isUp(n1, n2) === isUp(n2, n3);
}

const part1 = () => {
    const isReportSafe = report =>
        report.every((n, i) => i < 2 || isSafe(n, report[i-1], report[i-2]));
    return input.filter(isReportSafe).length;
};

const part2 = () => {
    const checkReport = report =>
        report.every((n, i) => i < 2 || isSafe(report[i-2], report[i-1], n));
    const isReportSafe = report => {
        if (checkReport(report)) return true;
        // create a new copy of the report with one level skipped at index i
        const makeSkipped = i => [...report.slice(0, i), ...report.slice(i + 1)];
        // iterate over the report, skipping exactly one level, until a valid
        // report is found. Will return false if none are found.
        return report.some((n, i) => checkReport(makeSkipped(i)));
    }
    return input.filter(isReportSafe).length;
};

runSolution(part1, part2);
