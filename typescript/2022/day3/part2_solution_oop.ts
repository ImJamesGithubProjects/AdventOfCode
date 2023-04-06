import { readFileSync } from 'fs';

// What is the priority of an item?
function priority(c: string): number {
    const characterIndex = c.charCodeAt(0)
    return characterIndex <= 90
        ? characterIndex - 38
        : characterIndex - 96;
}

class Backpack {
    items: Set<string>;

    constructor() {
        this.items = new Set<string>();
    }

    add(item: string) {
        this.items.add(item);
    }

    common(others: Backpack[]): string[] {
        return [...this.items].filter(item => (
            others.reduce((acc, cur) => acc && cur.items.has(item), true)
        ));
    }

    static fromString(s: string) {
        const b = new Backpack();
        [...s].forEach(item => b.add(item));
        return b;
    }
}

class Team {
    backpacks: Backpack[];

    constructor() {
        this.backpacks = [];
    }

    add(b: Backpack) {
        this.backpacks.push(b);
    }

    common(): string {
        const [b1, b2, b3] = this.backpacks;
        return b1.common([b2, b3])[0];
    }

    static fromLines(lines: string[]): Team[] {
        const teams = [];
        for (let i = 0; i < lines.length; i += 3) {
            const team = new Team();
            lines.slice(i, i + 3).forEach(line => {
                team.add(Backpack.fromString(line));
            })
            teams.push(team);
        }
        return teams;
    }
}

const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

const total_priority = Team.fromLines(input.split('\n'))
    .map(team => team.common())
    .map(priority)
    .reduce((acc, cur) => acc + cur, 0);

console.log(total_priority);
