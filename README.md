# Advent Of Code (JavaScript) (Day 1, 2)

## Day 1: Part 1

**Instructions:**
> On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number. What is the sum of all of the calibration values?


**Plan:**
- brute force first, optimize later
- split text into lines
- split the lines into tokens
- iterate lines to evaluate tokens
- if token is number: add to accumulator
- add accumulator values to final result

```js
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
```

## Day 1: Part 2

**Instructions:**
> Some of the digits are spelled out with letters: one, two, three, four, five, six, seven, eight, and nine count as valid "digits". Find the real first and last digit on each line.

**Plan:**
- same as above but little variation
- final value is still a number so the same math still applies
- if token is number: add to accumulator
- if token is textual number: add to accumulator
- continue using the same routine
- some textual numbers overlap each other, that's the only complexity, hence can't do a replace-all, evaluate numbers by order of appearance
- the rest is the same

```js
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const textualNumbers = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const lines = input.split('\n');
let result = null;

// lines
for(const currentLine of lines) {
	let digitsInCurrentLine = [];
	const tokens = currentLine.split('');

	// tokens
	for (const [index, currentToken] of tokens.entries()) {
		// save digit numbers
		if (parseInt(currentToken)) {
			digitsInCurrentLine.push(currentToken);
		}
		// save textual numbers
		else {
			for (const [number, value] of Object.entries(textualNumbers)) {
				if (currentLine.substring(index).startsWith(number)) {
					digitsInCurrentLine.push(value);
				}
			}
		}
	}
	// get first & last of this line
	const firstDigit = digitsInCurrentLine[0];
	const lastDigit = digitsInCurrentLine[digitsInCurrentLine.length - 1];
	// add up result
	result += parseInt(`${firstDigit}${lastDigit}`);
}

console.assert(281 === result, `Expected: 281; Actual: ${result};`);
```

---

## Day 2: Part 1

**Instructions:**
> Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

**Plan:**
- split text into games
- split games into sets
- compare set values to bag values
- if set value goes beyond what's in the bag the game is not possible
- otherwise add to result

```js
const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let result = null;

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
```

## Day 2: Part 2

**Instructions:**
> What is the fewest number of cubes of each color that could have been in the bag to make the game possible? The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. Add up all values.

**Plan:**
- same as previous but little variation
- check if values can make current game possible
- multiply all id's of possible games
- result is equal to all values multiplied

```js
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
		red: null,
		green: null,
		blue: null
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
```
