import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf8' });

function extract(line: string) {
    const numbers = [...line]
        .map(c => Number.parseInt(c))
        .filter(c => c);

    const first = numbers[0] * 10;
    const second = numbers[numbers.length - 1]

    return first + second;
}

const result = input
    .split("\n")
    .filter(line => line.length > 0)
    .map(extract)
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);
