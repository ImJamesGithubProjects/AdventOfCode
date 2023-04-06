<?php

//$input_data = file_get_contents('./example_data.txt');
$input_data = file_get_contents('./problem_data.txt');

// Find the first three items in an array.
function top3(array $items) {
  return array_slice($items, 0, 3);
}

// Find the solution to part 2 given the input values.
function solution(string $input) {
  $chunks = explode("\n\n", $input);

  $calories = array_map(function ($chunk) {
    return explode("\n", $chunk);
  }, $chunks);

  $calories_per_elf = array_map(function ($chunk) {
    return array_sum($chunk);
  }, $calories);

  rsort($calories_per_elf);
  
  $top3 = top3($calories_per_elf);

  return array_sum($top3);
}

print(solution($input_data));
print "\n";