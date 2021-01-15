// Ilya Zykin
// run the program with the following command:
// node example.js

"use strict"

// A lib from standard package
const { performance } = require('perf_hooks')

// Basic function to meet requirements
const expected_result = (a, b) => {
  const result = a === b
  console.log("Expected result: " + result)
  return result
}

const execution_time = (foo) => {
  const t0 = performance.now()
  foo()
  const t1 = performance.now()
  console.log("Execution time: " + (t1 - t0) + " ms")
}

// The function to solve the task
const solution = (array) => {
  return array.reduce((result, number) => {
    return result + number
  }, 0)
}

// Yhe solution
const arr = [1,2,3,4,5,6,7,8,9,0]

expected_result(solution(arr), 45)
execution_time(() => solution(arr))
