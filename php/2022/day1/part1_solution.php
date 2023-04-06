<?php

// $input_data = file_get_contents('./example_data.txt');
$input_data = file_get_contents('./problem_data.txt');

// Find the solution to part 1 given the input values.
function solution(string $input): int {
  $chunks = explode("\n\n", $input);

  $calories = array_map(function ($chunk) {
    return explode("\n", $chunk);
  }, $chunks);

  $calories_per_elf = array_map(function ($chunk) {
    return array_sum($chunk);
  }, $calories);

  return max($calories_per_elf);
}

print(solution($input_data));
print "\n";