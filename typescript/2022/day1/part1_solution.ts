import { readFileSync } from 'fs';

//const fileContents = readFileSync('./example_data.txt', { encoding: 'utf8'});
const fileContents = readFileSync('./problem_data.txt', { encoding: 'utf8'});

// Sum an array of numbers.
const sum = (items: Array<number>): number => 
  items.reduce((acc: number, cur: number) => acc + cur, 0);

// Find the solution to the problem, given a string containing the input data.
const solution = (input: string): number =>
  Math.max(...input.split('\n\n')
    .map(chunk => chunk.split('\n'))
    .map(chunk => chunk.map(item => Number(item)))
    .map(chunk => sum(chunk)));

console.log(solution(fileContents));