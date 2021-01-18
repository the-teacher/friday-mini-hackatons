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
  const m = input.length;
  const n = input[0].length;
  let islands = 0;

  const burn = (x, y) => {
    const isOutsideField = x >= m || x < 0 || y >= n || y < 0;

    if (isOutsideField) return;

    if (input[x][y] === 1) {
      // burn
      input[x][y] = 0;

      const top = [0, -1];
      const bottom = [0, 1];
      const left = [-1, 0];
      const right = [1, 0];

      for (let [dx, dy] of [top, right, bottom, left]) {
        burn(x + dx, y + dy);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 1) {
        islands++;
      }

      burn(i, j);
    }
  }

  return islands;
};

module.exports = solution;
