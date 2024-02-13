# Advent Of Code (JavaScript)

## Day 1: Part 1

**Instructions:**
> On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number. What is the sum of all of the calibration values?


**Plan:**
- brute force solution first, optimize later
- break down the input into lines
- split the lines into single tokens
- traverse each line to evaluate tokens
  - if token is number: add to accumulator
- add accumulator values to final result

```js
const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

let output = 0;

const lines = input.split('\n');

const firstAndLastDigits = [];

for(const currentLine of lines) {
    let digitsOfCurrentLine = '';
    const tokens = currentLine.split('');
    for (const currentToken of tokens) {
        if (parseInt(currentToken)) {
            digitsOfCurrentLine += currentToken;
        }
    }
    const firstDigit = digitsOfCurrentLine[0];
    const lastDigit = digitsOfCurrentLine[digitsOfCurrentLine.length - 1];
    firstAndLastDigits.push(`${firstDigit}${lastDigit}`);
}

for (const currentPair of firstAndLastDigits) {
    output += parseInt(currentPair);
}

console.log(`Result is: ${output}`);
```

## Day 1: Part 2

**Instructions:**
> Some of the digits are spelled out with letters: one, two, three, four, five, six, seven, eight, and nine count as valid "digits". Find the real first and last digit on each line.

**Plan:**
- same as above but little variation
- final value is still a number so the same math still applies
- text numbers are part of input
- replace text numbers with digits
- and continue using the same routine
- some textual numbers overlap each other, that's the only complexity, hence can't do a replace-all, will have to check which numbers order of appearance
- the rest is the same

```js
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
const textDigits = [['zero', 0], ['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]];
let output = 0;

const lines = input.split('\n');

const firstAndLastDigits = [];

for(const currentLine of lines) {

    // not the best performance, but practical solution, optimize later
    // transform text into digits
    // everything else stays the same
    for (const [index, token] of currentLine.split('').entries()) {
        for (const [number, value] of textDigits) {
            if (currentLine.substring(index).startsWith(number)) {
                currentLine = currentLine.replace(number, value);
            }
        }
    }

    let digitsOfCurrentLine = '';
    const tokens = currentLine.split('');
    for (const [index, currentToken] of tokens.entries()) {

        // is number
        if (parseInt(currentToken)) {
            digitsOfCurrentLine += currentToken;
        }

        // if the rest of the line is text number accumulate it
        else {
            for (const [number, value] of textDigits) {
                if (currentLine.substring(index).startsWith(number)) {
                    digitsOfCurrentLine += value;
                }
            }
        }

    }
    const firstDigit = digitsOfCurrentLine[0];
    const lastDigit = digitsOfCurrentLine[digitsOfCurrentLine.length - 1];
    firstAndLastDigits.push(`${firstDigit}${lastDigit}`);
}

for (const currentPair of firstAndLastDigits) {
    output += parseInt(currentPair);
}

console.log(`Result is: ${output}`);
```

## Day 2: Part 1

**Instructions:**
> Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

**Plan:**
- break down the input into subgroups
- traverse subgroups to evaluate cube values
- compare current values to bag values
- if current value goes beyond config the game is not possible
- if the current game is possible add to accumulator
- the accumlator is final result

```js
const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let output = 0;

const bag = {
    red: 12,
    green: 13,
    blue: 14
};

const games = input.split(`\n`);

for (const currentGame of games) {
    let [gameId, setsInThisGame] = currentGame.trim().split(': ');
    gameId = parseInt(gameId.split(' ')[1]);
    setsInThisGame = setsInThisGame.split(';');
    let gameIsPossible = true;
    for (const currentSet of setsInThisGame) {
        for (const pair of currentSet.trim().split(', ')) {
            const [value, color] = pair.trim().split(' ');
            // if value goes beyond config the game is not possible
            if (value > bag[color]) {
                gameIsPossible = false;
            }
        }
    }
    if (gameIsPossible) {
        output += gameId;
    }
    
}

console.log(output);
```

## Day 2: Part 2

**Instructions:**
> What is the fewest number of cubes of each color that could have been in the bag to make the game possible? The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. Add up all values.

**Plan:**
- same as above but little variation
- accumulate values that make the game possible
- multiply all id's of possible games
- result is equal to final multiplication

```js
const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let output = 0;

const bag = {
    red: 12,
    green: 13,
    blue: 14
};

const games = input.split(`\n`);

for (const currentGame of games) {
    let [gameId, setsInThisGame] = currentGame.trim().split(': ');
    gameId = parseInt(gameId.split(' ')[1]);
    setsInThisGame = setsInThisGame.split(';');
    let gameIsPossible = true;
    const cubesInThisGame = {
        red: 0,
        green: 0,
        blue: 0
    }
    for (const currentSet of setsInThisGame) {
        for (const pair of currentSet.trim().split(', ')) {
            const [value, color] = pair.trim().split(' ');
            // if value goes beyond config the game is not possible
            if (value > bag[color]) {
                gameIsPossible = false;
            }
            // accumulate values that make the game possible
            if (value > cubesInThisGame[color]) {
                cubesInThisGame[color] = parseInt(value);
            }
        }
    }
    output += cubesInThisGame.red * cubesInThisGame.green * cubesInThisGame.blue;
}

console.log(output);
```
