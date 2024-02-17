/**
 * Instructions:
 * - any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
 * - What is the sum of all the part numbers in the engine schematic?
 *
 * Plan:
 * - split lines
 * - extract number groups
 * - create search range (slice)
 * - search for adjacent symbols based on range (slice)
 * - add up values
 */

const input = `467..114..
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

	// number groups [['12', data], ['34', data], ['56', data]]
	const numGroups = currentLine.matchAll(/\d+/g); // value includes start index, which is vital for solving this puzzle 🙌

	// group ['12', data]
	for (const group of numGroups) {
		// number
		const number = parseInt(group[0]);

		// search range (capped to prevent out-of-bounds error)
		const sliceStart = Math.max(group.index - 1, 0);
		const sliceEnd   = Math.min((group.index + group[0].length), (currentLine.length - 1));

		// adjacent values
		const prevToken = currentLine[group.index - 1];
		const nextToken = currentLine[group.index + group[0].length];
		const prevLineTokens = lines[currentLineIndex - 1]?.slice(sliceStart, sliceEnd+1); // end +1 because slice does not include last item by default 😒
		const nextLineTokens = lines[currentLineIndex + 1]?.slice(sliceStart, sliceEnd+1); // end +1 because slice does not include last item by default 😒

		// check for symbols
		const adjacentValuesHaveSymbols = [prevToken, nextToken, prevLineTokens, nextLineTokens].some(function(value) {
			return value?.match(/[^\w\s.]/)
		});

		// add up values
		if (adjacentValuesHaveSymbols) sum += number;
	}
	return sum;
}, 0);

console.assert(4361 === result, `Expected: 4361; Actual: ${result}:`);
