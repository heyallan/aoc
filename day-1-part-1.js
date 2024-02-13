/**
 * Instructions:
 * - On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * - What is the sum of all of the calibration values?
 *
 * Plan:
 * - brute force first, optimize later
 * - split text into lines
 * - split the lines into tokens
 * - iterate lines to evaluate tokens
 * - if token is number: add to accumulator
 * - add accumulator values to final result
 */

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const lines = input.split('\n');

let result = null;

// lines
for (const currentLine of lines) {
	let digitsInCurrentLine = [];
	const tokens = currentLine.split('');

	// tokens
	digitsInCurrentLine = tokens.filter(function(token) {
		// save numeric tokens
		return parseInt(token);
	});

	// get first & last of this line
	const firstDigit = digitsInCurrentLine[0];
	const lastDigit = digitsInCurrentLine[digitsInCurrentLine.length - 1];
	// save result
	result += parseInt(`${firstDigit}${lastDigit}`);
}

console.assert(142 === result, `Expected: 142; Actual: ${result}:`)
