import { readFileSync } from 'fs';

// Define some type synonyms.
type Item = string;
type Backpack = string;
type Team = Backpack[];

// What is the priority of an item?
const priority = (item: Item): number =>
    (c => c <= 90 ? c - 38 : c - 96)(item.charCodeAt(0));

// Split an array of backpacks into teams of three backpacks.
function split_teams(backpacks: Backpack[]): Array<Team> {
    const teams: Team[] = [];
    for (let i = 0; i < backpacks.length; i += 3) {
        teams.push(backpacks.slice(i, i + 3));
    }

    return teams;
}

// Split the input into individual lines.
const split_lines = (input: string): Backpack[] =>
    input.split('\n');

// Find common item in three backpacks.
const common_element = (b1: Set<Item>, b2: Set<Item>, c3: Set<Item>): Item =>
    [...b1].filter((item: Item): boolean => b2.has(item) && c3.has(item))[0]

//const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

const total_priority: number =
    split_teams(split_lines(input))
        .map(team => common_element(
            new Set(team[0]),
            new Set(team[1]),
            new Set(team[2]))
        )
        .map(priority)
        .reduce((acc, cur) => acc + cur, 0);

console.log(total_priority);
