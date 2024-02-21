/**
 * Instructions:
 * - Winning numbers | numbers you have
 * - figure out which of the numbers you have appear in the list of winning numbers
 * - Card is worth 1 for the first match, then doubled three times for each of the three matches after the first
 * - How many points are they worth in total?
 *
 * Plan:
 * - split lines
 * - extract numbers
 * - extract winners
 * - multiply values
 * - add up values
 */

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const lines = input.split('\n');

const result = lines.reduce(function(sum, line, lineIndex, lines) {
	// get numbers
	const winningNumbers = Array.from(line.split('|')[0].split(':')[1].matchAll(/\d{1,}/g), match => match[0]);
	const actualNumbers = Array.from(line.split('|')[1].matchAll(/\d{1,}/g), match => match[0]);

	// extract winners
	const matchingNumbers = actualNumbers.filter(function(currentNumber) {
		return winningNumbers.includes(currentNumber)
	});

	// multiply values
	const currentLinePoints = matchingNumbers.reduce(function(accumulator, item, index) {
		return (index === 0) ? 1 : accumulator * 2;
	}, 0);

	// add up
	return sum + currentLinePoints;
}, 0);

console.assert(13 === result, `Expected: 13; Actual: ${result}:`);

