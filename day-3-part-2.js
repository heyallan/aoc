/**
 * Instructions:
 * - A gear is any * symbol that is adjacent to exactly two part numbers.
 * - Its gear ratio is the result of multiplying those two numbers together.
 * - find the gear ratio of every gear
 * - add them all up
 *
 * Plan:
 * - split lines
 * - extract symbols
 * - create search range (slice)
 * - search for adjacent numbers based on range (slice)
 * - add up values
 */

const input = `..........
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = input.split('\n');

const result = lines.reduce(function(sum, currentLine, currentLineIndex) {

	// symbols list
	const symbolMatches = currentLine.matchAll(/\*/g); // value includes start index, which is vital for solving this puzzle 🙌

	// symbol symbolMatch
	for (const symbolMatch of symbolMatches) {
		// symbol
		const symbol = symbolMatch[0];

		// search range (capped to prevent out-of-bounds error)
		const sliceStart = Math.max(symbolMatch.index - 1, 0);
		const sliceEnd   = Math.min((symbolMatch.index + symbolMatch[0].length), (currentLine.length - 1));

		// get all numbers per line
		const currentLineNumbers = currentLine.matchAll(/\d+/g); /** iterable */
		const prevLineNumbers = lines[currentLineIndex - 1]?.matchAll(/\d+/g); /** iterable || undefined */
		const nextLineNumbers = lines[currentLineIndex + 1]?.matchAll(/\d+/g); /** iterable || undefined */

		// extract adjacent numbers
		const adjacentNumbers = [...currentLineNumbers, ...prevLineNumbers, ...nextLineNumbers].reduce(function(accumulator, numMatch) {
			const numStart = numMatch.index;
			const numEnd = numMatch.index + numMatch[0].length - 1;
			if (numStart <= sliceEnd && numEnd >= sliceStart) accumulator.push(numMatch[0]);
			return accumulator;
		}, []);

		// multiply values
		if (adjacentNumbers.length === 2) {
			sum += adjacentNumbers[0] * adjacentNumbers[1];
		}
	}
	return sum;
}, 0);

console.assert(467835 === result, `Expected: 467835; Actual: ${result}:`);