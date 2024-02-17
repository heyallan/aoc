/**
 * Instructions:
 * - Some of the digits are spelled out with letters: one, two, three, four, five, six, seven, eight, and nine count as valid "digits".
 * - Find the real first and last digit on each line.
 *
 * Plan:
 * - same as above but little variation
 * - final value is still a number so the same math still applies
 * - if token is number: add to accumulator
 * - if token is textual number: add to accumulator
 * - continue using the same routine
 * - some textual numbers overlap each other, that's the only complexity, hence can't do a replace-all, evaluate numbers by order of appearance
 * - the rest is the same
 */

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const textualNumbers = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

const lines = input.split('\n');

const result = lines.reduce(function(sum, currentLine) {
	let digitsInCurrentLine = [];
	const tokens = currentLine.split('');

	// tokens
	for (const [index, currentToken] of tokens.entries()) {
		// save regular numbers
		if (parseInt(currentToken)) {
			digitsInCurrentLine.push(currentToken);
		}
		// check for textual numbers
		else {
			for (const [number, value] of Object.entries(textualNumbers)) {
				// save textual numbers
				if (currentLine.substring(index).startsWith(number)) {
					digitsInCurrentLine.push(value);
				}
			}
		}
	}
	// get first & last digits in this line
	const firstDigit = digitsInCurrentLine[0];
	const lastDigit = digitsInCurrentLine[digitsInCurrentLine.length - 1];
	// add up result
	return sum += parseInt(`${firstDigit}${lastDigit}`);
}, 0);

console.assert(281 === result, `Expected: 281; Actual: ${result};`);