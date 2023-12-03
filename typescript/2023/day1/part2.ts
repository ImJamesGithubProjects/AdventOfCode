import { readFileSync } from 'fs';

// const input = `
// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// `;
const input = readFileSync('./input.txt', { encoding: 'utf8' });

function first(line: string): number {
    const numbers: Record<string, number> = {
        one:   1,   two: 2, three: 3,
        four:  4,  five: 5,   six: 6,
        seven: 7, eight: 8,  nine: 9
    };
    let buffer = '';
    for (let i = 0; i < line.length; i++) {
        // Get a character.
        const c = line[i];

        // Is it a number? If so, return it.
        if (Number.parseInt(c)) {
            return Number.parseInt(c);
        }

        // If not, concat the character to the end of the buffer.
        buffer += c;


        // Check to see if there's a number word in the buffer.
        for (let n in numbers) {
            if (buffer.indexOf(n) > -1) {
                return numbers[n];
            }
        }
    }

    return -1; // Necessary to prevent TS from getting upset
}

function last(line: string): number {
    const numbers: Record<string, number> = {
        eno: 1,
        owt: 2,
        eerht: 3,
        ruof: 4,
        evif: 5,
        xis: 6,
        neves: 7,
        thgie: 8,
        enin: 9
    };
    let buffer = '';
    for (let i = line.length - 1; i >= 0; i--) {
        // Get a character.
        const c = line[i];

        // Is it a number? If so, return it.
        if (Number.parseInt(c)) {
            return Number.parseInt(c);
        }

        // If not, concat the character to the end of the buffer.
        buffer += c;


        // Check to see if there's a number word in the buffer.
        for (let n in numbers) {
            if (buffer.indexOf(n) > -1) {
                return numbers[n];
            }
        }
    }

    return -1; // Necessary to prevent TS from getting upset
}

function extract(line: string): number {
    return 10 * first(line) + last(line);
}
const result = input
    .split("\n")
    .filter(line => line.length > 0)
    .map(extract)
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);
