const newLine = /\n/gi;

exports.getStrings = contents => contents.split(newLine).filter(Boolean);
exports.getNumbers = contents => contents.split(newLine).map(Number);
