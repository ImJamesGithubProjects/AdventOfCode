import { readFileSync } from 'fs';

// const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

const sort_pair = (p1: number[], p2: number[]): number[][] =>
    p1[0] < p2[0] ? [p1, p2] : [p2, p1];

const overlap = (pairs: number[][]): boolean =>
    pairs[1][0] <= pairs[0][1]

// Convert 'x-y' into [x, y].
const parse_pair = (pair: string): number[] =>
    pair.split('-').map(Number);

// Convert 'a-b,c-d' into [[a, b], [c, d]].
const parse_line = (line: string): number[][] =>
    line.split(',').map(parse_pair);

const result = input
    .split('\n')
    .map(parse_line)
    .map(line => sort_pair(line[0], line[1]))
    .filter(overlap)
    .length

console.log(result)
