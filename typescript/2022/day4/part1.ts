import { readFileSync } from 'fs';

//const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

// Is one pair contained within another?
const within = (p1: number[], p2: number[]): boolean =>
    (p1[0] >= p2[0]) && (p1[1] <= p2[1])
    || (p2[0] >= p1[0] && p2[1] <= p1[1])

// Convert 'x-y' into [x, y].
const parse_pair = (pair: string): number[] =>
    pair.split('-').map(Number);

// Convert 'a-b,c-d' into [[a, b], [c, d]].
const parse_line = (line: string): number[][] =>
    line.split(',').map(parse_pair);

const result = input
    .split('\n')
    .map(parse_line)
    .filter(([p1, p2]) => within(p1, p2))
    .length

console.log(result)
