# AoC Challenges

## Day 1: Part 1

**Prompt:**

> On each line, the value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number. What is the sum of all of the calibration values?


**Plan:**
- brute force first, optimize later
- break down the input data into lines
- split the lines into single tokens
- traverse each line to evaluate each token
  - if token is number: add to accumulator
- add accumulator values to final result

```js
const input = `eightqrssm9httwogqshfxninepnfrppfzhsc...`;
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



## Challenge: Day 3

## Challenge: Day 4 

## Challenge: Day 5 
