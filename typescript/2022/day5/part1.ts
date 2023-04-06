/*

The input looks like:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2k

The input has three sections: a stack drawing, a sequence of numbers and
a list of move instructions.

Each of the stack drawing lines has 4*(N-1) + 3 characters, where N is the
number of stacks. Therefore the characters are at positions 1, 5, ...., 4*(i-1)+1
and there are floor(length / 4) + 1 items on each line.

*/

import { readFileSync } from 'fs';

//const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

// Given an input line from the DRAWING section, calculate the number of stacks.
const find_num_stacks = (line: string): number => Math.floor(line.length / 4) + 1;

// Parse the input and find the solution.
function parse(input:string): string {
    // Split lines.
    const lines = input.split('\n');

    // Find number of stacks by examining the length of the first line.
    const num_stacks = find_num_stacks(lines[0]);

    // Initialise stacks.
    const stacks: string[][] = [];
    for (let i = 0; i < num_stacks; i++) stacks.push([])

    // Keep track of the state of the parser.
    let mode: 'DRAWING' | 'NUMBERS' | 'INSTRUCTIONS' = 'DRAWING'

    for (const line of lines) {

        switch (mode) {
            case 'DRAWING':
                if (line.indexOf('[') < 0) {
                    mode = 'NUMBERS';
                } else {
                    for (let i = 0; i < num_stacks; i++) {
                        const item = line[4*i+1];
                        if (item !== ' ') {
                            stacks[i].unshift(item);
                        }
                    }
                }
                break;

            case 'NUMBERS':
                console.log('initial', stacks)
                mode = 'INSTRUCTIONS';
                break;

            case 'INSTRUCTIONS':
                const matches = line.match(/^move (\d+) from (\d+) to (\d+)$/);
                if (matches) {
                    const [num, source, dest] = [
                        Number(matches[1]),
                        Number(matches[2]) - 1,
                        Number(matches[3]) - 1
                    ];

                    for (let i = 0; i < num; i++) {
                        const item = stacks[source].pop();
                        if (item) {
                            stacks[dest].push(item);
                        }
                    }
                }
        }
    }

    // Return top item on each stack.
    return stacks.reduce((acc, cur) => acc + cur.pop(), '');
}

console.log(parse(input));

