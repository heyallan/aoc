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
	let gameIsPossible = true;
	// sets
	for (const currentSet of setsInThisGame) {
		// cubes
		for (const pair of currentSet.trim().split(', ')) {
			const [value, color] = pair.trim().split(' ');
			// if value go beyond what's in the bag this game is not possible
			if (value > bag[color]) {
				// discard impossible game
				gameIsPossible = false;
			}
		}
	}
	// save possible games
	if (gameIsPossible) {
		result += gameId;
	}
}

console.assert(8 === result, `Expected: 8; Actual: ${result};`);
