import { readFileSync } from 'fs';

// const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

interface File { name: string, size: number }

function parseInput(input: string): File[] {
    const lines = input.split('\n');
    const result: File[] = [];
    const cwd: string[] = [];
    for (let line of lines) {

        // The only lines that interest us are:

        // cd /
        if (line === '$ cd /') {
            cwd.push('');
            continue;
        }

        // cd ..
        if (line === '$ cd ..') {
            cwd.pop();
            continue;
        }

        // cd directoryname
        let matches = line.match(/\$ cd (\w+)/);
        if (matches) {
            cwd.push(matches[1]);
            continue;
        }

        // 12345 filename.ext
        matches = line.match(/(\d+) (.*)/);
        if (matches) {
            result.push({
                name: cwd.join('/') + '/' + matches[2],
                size: Number(matches[1])
            }
            )
        }
    }

    return result;
}

const files = parseInput(input);

const parentDirectories = (filename: string): string[] =>
    filename.split('/').slice(0, -1)

function directoriesWithSizes(files: File[]): File[] {
    const directories: Record<string, File> = {};
    for (let file of files) {
        const segments = parentDirectories(file.name);
        for (let i = 0; i < segments.length; i++) {
            const directoryName = i === 0 ? '/' : segments.slice(0, i + 1).join('/');
            directories[directoryName] ||= {
                name: directoryName,
                size: 0
            };
            directories[directoryName].size += file.size;
        }
    }
    return Object.values(directories);
}

const directories = directoriesWithSizes(files);

const unusedSpace = directories
    .filter(directory => directory.name === '/')
    .map(directory => 70000000 - directory.size)
    .reduce((_, cur) => cur, 0)

const candidates = directories
    .filter(directory => unusedSpace + directory.size > 30000000)
    .sort((a, b) => a.size - b.size);

const result = candidates[0].size;

console.log(result);


