import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', { encoding: 'utf8' });

// const input = `
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// `;

function get_game_number(line: string): number {
    const chunk = line.split(':')[0];
    return Number(chunk.split(' ')[1]);
}

function is_legal(line: string): boolean {
    const colours: Record<string, number> = {
        red: 12,
        green: 13,
        blue: 14
    };

    for (let colour in colours) {
        const max = colours[colour];
        const re = new RegExp(`(\\d+) ${colour}`, 'g');
        const matches = line.matchAll(re);
        for (let match of matches) {
            if (Number(match[1]) > max) {
                return false;
            }
        }
    }
    
    return true;
}

const result = input
    .split("\n")
    .filter(line => line.length > 0)
    .filter(is_legal)
    .map(get_game_number)
    .reduce((acc, cur) => acc + cur, 0);


console.log(result);