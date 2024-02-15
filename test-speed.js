const { spawn } = require("child_process");

function generateRandomArray(length) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 100));
  }
  return randomArray;
}

// MUCH slower than customSort()
function sort(numbers) {
  for (let i = 0; i < numbers.length; ++i) {
    for (let j = 0; j < numbers.length - (i + 1); ++j) {
      const left = numbers[j];

      const right = numbers[j + 1];

      if (left > right) {
        numbers[j] = right;
        numbers[j + 1] = left;
      }
    }
  }
  return numbers;
}

function customSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    }
  }

  return customSort(left).concat(pivot, customSort(right));
}

const arr = generateRandomArray(2_000);

console.time("cCompiledSorter"); // Start timer for C binary child process
const child = spawn("./sort_numbers", arr.map(String));

child.stdout.on("data", (data) => {
  process.stdout.write(data);
});

child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
  console.timeEnd("cCompiledSorter");
});

console.time("customSort"); // Start timer for custom sorting
console.log(customSort(arr)); // Call custom sorting function
console.timeEnd("customSort"); // End timer for custom sorting

console.time("arraySort"); // Start timer for built-in array sorting
console.log(arr.slice().sort((a, b) => a - b)); // Call built-in array sorting function
console.timeEnd("arraySort"); // End timer for built-in array sorting

console.time("quickSort"); // Start timer for built-in quicksort
console.log(arr.slice().sort()); // Call built-in quicksort function
console.timeEnd("quickSort"); // End timer for built-in quicksort
