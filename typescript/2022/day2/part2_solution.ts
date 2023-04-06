import { readFileSync } from 'fs';

// const input = readFileSync('./example_data.txt', { encoding: 'utf8' });
const input = readFileSync('./problem_data.txt', { encoding: 'utf8' });

enum Move { Rock, Paper, Scissors };
enum Outcome { Win, Draw, Lose };

// Convert a move from its string representation to a Move enum value.
function p(char: string): Move {
  if (char === 'A') return Move.Rock
  else if (char === 'B') return Move.Paper
  else return Move.Scissors;
}

// Convert a desired outcome from its string representation to an Outcome enum value.
function q(char: string): Outcome {
  if (char === 'X') return Outcome.Lose
  else if (char === 'Y') return Outcome.Draw
  else return Outcome.Win;
}

// Given player 1's move and a desired outcome, which move should player 2 make?
function reaction(m: Move, desired_outcome: Outcome): Move {
  if (desired_outcome === Outcome.Win) {
    if (m === Move.Paper) return Move.Scissors;
    if (m === Move.Rock) return Move.Paper;
    if (m === Move.Scissors) return Move.Rock;
  } else if (desired_outcome === Outcome.Lose) {
    if (m === Move.Paper) return Move.Rock;
    if (m === Move.Rock) return Move.Scissors;
    if (m === Move.Scissors) return Move.Paper;
  }
  return m; // Draw.
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

type Round = {
  move: Move,
  desired_outcome: Outcome
}

const scores = input.split('\n')                                // Split lines.
  .map(line => line.split(' '))                                 // Extract moves.
  .map((round: string[]): Round => ({                           // Convert rounds into a typed representation.
    move: p(round[0]),
    desired_outcome: q(round[1]) 
  }))
  .map(({ move, desired_outcome }: Round): number => score(     // Calculate our score for each round.
                                                                // From...
    reaction(move, desired_outcome),                            // The move we should respond with to produce the desired outcome...
    desired_outcome                                             // ...and the desired outcome itself.

  ));

console.log(sum(scores));
