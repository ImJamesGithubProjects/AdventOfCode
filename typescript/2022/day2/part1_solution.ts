import { readFileSync } from 'fs';

//const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

enum Move { Rock, Paper, Scissors };
enum Outcome { Win, Draw, Lose };

// Convert a move from its string representation to a Move enum value.
function p(char: string): Move {
  if (char === 'A' || char === 'X') return Move.Rock
  else if (char === 'B' || char === 'Y') return Move.Paper
  else return Move.Scissors;
}

// Given a pair of moves in a round, what is the outcome for player 1?
function outcome(m1: Move, m2: Move): Outcome {
  if (m1 === m2) {
    return Outcome.Draw;
  } else if (
    (m1 === Move.Rock && m2 === Move.Scissors)
    || (m1 === Move.Paper && m2 === Move.Rock)
    || (m1 === Move.Scissors && m2 === Move.Paper)
  ) {
    return Outcome.Win;
  } else {
    return Outcome.Lose;
  }
}

// Give a player's move and the outcome of the round, what is the player's score?
function score(move: Move, outcome: Outcome) {
  let moveScore = 1;  // Rock.
  if (move === Move.Paper) moveScore = 2;
  if (move === Move.Scissors) moveScore = 3;

  let outcomeScore = 0; // Lose.
  if (outcome === Outcome.Draw) outcomeScore = 3;
  if (outcome === Outcome.Win) outcomeScore = 6;

  return moveScore + outcomeScore;
}

// Sum an array of numbers.
const sum = (nums: number[]): number => nums.reduce((acc, cur) => acc + cur, 0);

const scores = input.split('\n')                           // Split lines.
  .map(line => line.split(' '))                            // Extract moves.
  .map(([m1, m2]: string[]) => [p(m1), p(m2)])             // Convert moves to Move enum values.
  .map(([m1, m2]: Move[]) => score(m2, outcome(m2, m1)));  // Calculate scores. Note the moves are backwards, per the spec.

console.log(sum(scores));
