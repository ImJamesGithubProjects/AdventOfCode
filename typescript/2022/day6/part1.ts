import { readFileSync } from 'fs';

// const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

// Given a string of length 4, are all the characters unique?
function is_marker(s: string): boolean {
    // console.log('Checking', s);
    const seen: Set<string> = new Set<string>;
    for (let i = 0; i < 4; i++) {
        seen.add(s[i]);
    }

    return seen.size === 4;
}

// Loop implementation.
function position_of_marker(s: string): number {
    for (let i = 4; i < input.length; i++) {
        if (is_marker(s.slice(i-4, i))) return i;
    }

    throw new Error('Marker not found');
}

// Recursive implementation. Note that there is some debate over whether
// Node can be expected to perform tail call optimisation.
function position_of_marker_rec(s: string): number {
    function position_of_marker_rec2(s: string, i: number): number {
        switch (true) {
            case is_marker(s.slice(0, 4)):
                return i;
            case s.length <= 4:
                throw new Error('Marker not found');
            default:
                return position_of_marker_rec2(s.slice(1), i+1);
        }
    }
    return position_of_marker_rec2(s, 4);
}

// For fun, a generator implementation.
function position_of_marker_gen(s: string): number {
    function* substrings(s: string): Generator<string> {
        for (let i = 4; i < input.length; i++) {
            yield s.slice(i-4, i);
        }
    }

    let i = 4;
    for (let substring of substrings(s)) {
        if (is_marker(substring)) return i;
        i += 1;
    }

    throw new Error('Marker not found');
}


console.log(position_of_marker(input));
console.log(position_of_marker_rec(input));
console.log(position_of_marker_gen(input));