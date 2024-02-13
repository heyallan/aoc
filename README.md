# AoC Challenges

> AOC Challenges

## Challenge: Day 1

**Prompt #1:**

> On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number. What is the sum of all of the calibration values?


plan:
- brute force first, optimize later
- break down the input data into lines
- split the lines into single tokens
- traverse each line to check the tokens one by on
  - if token is number: add to line accumulator
  - add line result to global result accumulator

```js
const input = `eightqrssm9httwogqshfxninepnfrppfzhsc...`;
let result = 0;
const lines = input.split('\n');
const lineResults = [];

for(const singleLine of lines) {
    let lineNumbers = '';
    const tokens = singleLine.split('');
    for (const token of tokens) {
        if (parseInt(token)) {
            lineNumbers += token;
        }
    }
    const firstNumber = lineNumbers[0];
    const lastNumber = lineNumbers[lineNumbers.length - 1];
    lineResults.push(`${firstNumber}${lastNumber}`);
}

for (const lineDouble of lineResults) {
    result += parseInt(lineDouble);
}

console.log(`Result is: ${result}`);
```

## Challenge: Day 2

## Challenge: Day 3

## Challenge: Day 4 

## Challenge: Day 5 
