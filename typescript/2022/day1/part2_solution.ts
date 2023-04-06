import { readFileSync } from 'fs';

//const fileContents = readFileSync('./example_data.txt', { encoding: 'utf8'});
const fileContents = readFileSync('./problem_data.txt', { encoding: 'utf8'});

// Sum an array of numbers.
const sum = (items: Array<number>): number => 
  items.reduce((acc: number, cur: number) => acc + cur, 0);

// Calculate the calories per Elf from the input file.
const calories = (input: string): Array<number> =>
  input.split('\n\n')
  .map(chunk => chunk.split('\n'))
  .map(chunk => chunk.map(item => Number(item)))
  .map(chunk => sum(chunk));

// Find the three largest numbers in an array. In this case we can 
// assume that there are at least three Elves.
const top3 = (items: Array<number>): Array<number> =>
  [...items]
    .sort((a: number, b: number): number => b - a)
    .slice(0, 3);


console.log(sum(top3(calories(fileContents))));