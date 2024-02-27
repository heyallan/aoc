/**
 * Instructions:
 * - What is the fewest number of cubes of each color that could have been in the bag to make the game possible?
 * - The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
 * - Add up all values.
 *
 * Plan:
 * - same as previous but little variation
 * - check if values can make current game possible
 * - multiply all id's of possible games
 * - result
 */

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const games = input.split(`\n`);

// games
const result = games.reduce(function(total, currentGame) {
	let [gameId, setsInThisGame] = currentGame.trim().split(': ');
	gameId = parseInt(gameId.split(' ')[1]);
	setsInThisGame = setsInThisGame.split(';'); // ["3 red, 4 blue, 5 green", "7 red, 8 blue, 9 green"]

	// count total cubes per color: "3 red, 4 blue, 5 green"
	const cubesInThisGame = setsInThisGame.reduce(function(totalCubes, currentSet) {
		// cubes
		for (const colorSet of currentSet.trim().split(', ')) {
			const [value, color] = colorSet.trim().split(' ');
			// save highest values (minimum required to make this game possible)
			if (value > totalCubes[color]) {
				totalCubes[color] = parseInt(value);
			}
		}
		return totalCubes;
	}, { red: 0, green: 0, blue: 0 });

	// multiply highest values (minimum required to make this game possible)
	return total + (cubesInThisGame.red * cubesInThisGame.green * cubesInThisGame.blue);
}, 0);

console.assert(2286 === result, `Expected: 2286; Actual ${result};`);
