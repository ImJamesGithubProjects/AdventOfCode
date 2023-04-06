import { readFileSync } from 'fs';

// Define some type synonyms.
type Item = string;
type Backpack = string;
type Compartment = Set<Item>;

// What is the priority of an item?
const priority = (item: Item): number =>
    (c => c <= 90 ? c - 38 : c - 96)(item.charCodeAt(0));

// Split the input into individual lines.
const split_lines = (input: string): Backpack[] =>
    input.split('\n');

// Split a backpack into two compartments.
const compartments = (backpack: Backpack): Compartment[] => [
    new Set<string>(backpack.slice(0, backpack.length / 2)),
    new Set<string>(backpack.slice(backpack.length / 2))
];

// JS/TS doesn't have an insersection function, so let's write one.
const intersect = <T>(s1: Set<T>, s2: Set<T>): Array<T> => 
    [...s1].filter((item: T): boolean => s2.has(item));

// Find common item in two compartments.
const common_element = (left: Compartment, right: Compartment): Item =>
    intersect(left, right)[0];

// const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

const total_priority: number =
    split_lines(input)
        .map(line => compartments(line))
        .map(([left, right]) => common_element(left, right))
        .map(priority)
        .reduce((acc, cur) => acc + cur, 0);

console.log(total_priority);