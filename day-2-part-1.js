/**
 * Instructions:
 * - Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * - What is the sum of the IDs of those games?
 *
 * Plan:
 * - split text into games
 * - split games into sets
 * - compare set values to bag values
 * - if set value goes beyond what's in the bag the game is not possible
 * - otherwise add to result
 */

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const bag = {
	red: 12,
	green: 13,
	blue: 14
};

const games = input.split(`\n`);

// games
const result = games.reduce(function(sum, currentGame) {
	let [gameId, setsInThisGame] = currentGame.trim().split(': ');
	gameId = parseInt(gameId.split(' ')[1]);
	setsInThisGame = setsInThisGame.split(';'); // ["3 red, 4 blue, 5 green", "7 red, 8 blue, 9 green"]

	// extract viable sets: "3 red, 4 blue, 5 green"
	const setsOutcomes = setsInThisGame.reduce(function(outcome, currentSet) {
		// check colors: "3 red"
		for (const colorSet of currentSet.trim().split(', ')) {
			const [value, color] = colorSet.trim().split(' ');
			// if counter remains below what's in the bag, this game is possible
			outcome.push(value <= bag[color]);
		}
		return outcome;
	}, []);

	// if all sets are viable this game is possible
	const gameIsPossible = setsOutcomes.every(function(value) {
		return value === true;
	});

	// udd up
	return sum + (gameIsPossible ? gameId : 0);
}, 0);

console.assert(8 === result, `Expected: 8; Actual: ${result};`);
