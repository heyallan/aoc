# AoC Challenges

> Using JavaScript as my primary language

## Day 1: Part 1

**Prompt:**
> On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number. What is the sum of all of the calibration values?


**Plan:**
- brute force first, optimize later
- break down the input into lines
- split the lines into single tokens
- traverse each line to evaluate each token
  - if token is number: add to accumulator
- add accumulator values to final result

```js
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
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

**Prompt:**
> Some of the digits are spelled out with letters: one, two, three, four, five, six, seven, eight, and nine count as valid "digits". Find the real first and last digit on each line.

**Plan:**
- similar routine but little variation
- final value is still a number so same math still applies
- text numbers exist only within input
- replace text numbers with digits
- and continue using the rest of the same routine

## Challenge: Day 3

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

## Challenge: Day 4 

## Challenge: Day 5 
