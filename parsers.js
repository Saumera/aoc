const newLine = /\n/gi;

exports.getStrings = contents => contents.split(newLine);
exports.getNumbers = contents => contents.split(newLine).map(Number);
