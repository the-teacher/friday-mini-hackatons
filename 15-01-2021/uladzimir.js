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

  const islands = {}
  let islandsIndex = 0

  const walk = (i, j) => {
    // outside of map
    if (i === m || j === n) return

    const cellId = i + '' + j

    // we already checked it
    if (islands[cellId]) return

    if (input[i][j] === 1) {
      if ((i > 0 && input[i - 1][j] > 0) || (j > 0 && input[i][j - 1] > 0)) {
        if (i > 0) {
          islands[cellId] = input[i - 1][j]
        } else if (j > 0) {
          islands[cellId] = input[i][j - 1]
        }
      } else {
        islands[cellId] = islandsIndex++
      }

      walk(i + 1, j)
      walk(i, j + 1)
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      walk(i, j)
    }
  }

  return islandsIndex
}

module.exports = solution
