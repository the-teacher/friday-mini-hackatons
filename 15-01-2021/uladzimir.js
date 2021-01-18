/**
[
  [0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,1],
  [0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0],
  [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0],
]
 */

const solution = (input) => {
  const m = input.length
  const n = input[0].length
  let islands = 0

  const walk = (x, y) => {
    // check if x, y within field

    if (!(x < m && x >= 0 && y < n && y >= 0)) return

    if (input[x][y] === 1) {
    // replace 1 with 0
    input[x][y] = 0

    // if so, check top, bottom, left, right
      walk(x - 1, y)
      walk(x + 1, y)
      walk(x, y - 1)
      walk(x, y + 1)
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 1) {
        islands++
      }

      walk(i, j)
    }
  }

  return islands
}

module.exports = solution
