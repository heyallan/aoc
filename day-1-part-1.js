/**
 * Instructions:
 * - On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * - What is the sum of all the calibration values?
 *
 * Plan:
 * - brute force first, optimize later
 * - split text into lines
 * - split the lines into tokens
 * - iterate lines to evaluate tokens
 * - if token is number: add to accumulator
 * - add up values
 */

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const lines = input.split('\n');

const result = lines.reduce(function(sum, currentLine) {
	// tokens
	const tokens = currentLine.split('');
	// save numeric value
	let digits = tokens.filter(function(token) {
		return parseInt(token);
	});
	// get first & last of current line
	const firstDigit = digits[0];
	const lastDigit = digits[digits.length - 1];
	// add up
	return sum += parseInt(`${firstDigit}${lastDigit}`);
}, 0);

console.assert(142 === result, `Expected: 142; Actual: ${result}:`);
