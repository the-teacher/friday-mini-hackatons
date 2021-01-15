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
const GROUND = 1

const inFoundGrounds = (foundGrounds, x, y) => {
  return foundGrounds.find((ground) => JSON.stringify(ground) === JSON.stringify([x, y]))
}

// The function to solve the task
const findNeighborGrounds = (map, currentX, currentY, foundGrounds = []) => {
  const xDelta = [-1, 0, 1]
  const yDelta = [-1, 0, 1]

  foundGrounds.push([currentX, currentY])

  console.log(`THIS POINT! map[${currentX}][${currentY}]`, map[currentX][currentY])

  xDelta.forEach((dx) => {
    yDelta.forEach((dy) => {
      const isCurrentGround = dx === 0 && dy === 0

      if (!isCurrentGround) {
        const x = currentX + dx
        const y = currentY + dy

        if (x >= 0 && y >= 0 && !isCurrentGround) {
          if (map[x][y] === GROUND) {
            console.log(`GROUND map[${x}][${y}]`, map[x][y])

            if (!inFoundGrounds(foundGrounds), x, y) {
              console.log(`FOUND GROUND map[${x}][${y}]`, map[x][y])
              const newFoundGrounds = findNeighborGrounds(map, x, y, foundGrounds)
              foundGrounds = [foundGrounds, ...newFoundGrounds]
            }
          }
        }
      }
    })
  })

  return foundGrounds
}

// const solution = (map) => {
//   findNeighborGrounds(map, 0, 2)
// }

// The solution
const map = [
  [0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,1],
  [0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0],
  [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0],
  [0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0]
]

console.log(
  findNeighborGrounds(map, 0, 2, [])
)

// expected_result(solution(map), 9)
// execution_time(() => solution(map))
