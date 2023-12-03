import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf8' });

// const input = `
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// `;

function power(line: string): number {
    const colours = ['red', 'green', 'blue'];
    const max: Record<string, number> = { red: 0, green: 0, blue: 0};
    colours.forEach(colour => {
        const re = new RegExp(`(\\d+) ${colour}`, 'g');
        const matches = [...line.matchAll(re)];
        matches.forEach(match => {
            max[colour] = Math.max(
                max[colour],
                Number(match[1])
            );
        })
    });

    return max.red * max.blue * max.green;
}

const sum = (acc: number, cur: number): number => acc + cur;

const result = input
    .split("\n")
    .filter(line => line.length > 0)
    .map(power)
    .reduce(sum)

console.log(result);