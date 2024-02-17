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

let result = 0;

const bag = {
	red: 12,
	green: 13,
	blue: 14
};

const games = input.split(`\n`);

// games
for (const currentGame of games) {
	let [gameId, setsInThisGame] = currentGame.trim().split(': ');
	gameId = parseInt(gameId.split(' ')[1]);
	setsInThisGame = setsInThisGame.split(';');
	const cubesInThisGame = {
		red: 0,
		green: 0,
		blue: 0
	}
	// sets
	for (const currentSet of setsInThisGame) {
		// cubes
		for (const pair of currentSet.trim().split(', ')) {
			const [value, color] = pair.trim().split(' ');
			// save highest values
			// highest values represent the minimum required to make this game possible
			if (value > cubesInThisGame[color]) {
				cubesInThisGame[color] = parseInt(value);
			}
		}
	}
	// multiply highest values (minimum required to make this game possible)
	result += cubesInThisGame.red * cubesInThisGame.green * cubesInThisGame.blue;
}

console.assert(2286 === result, `Expected: 2286; Actual ${result};`);
