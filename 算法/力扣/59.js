/** middle 螺旋矩阵 II
 * 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，
 * 且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 */
let tiems = 10
console.log(generateMatrix(2))
function generateMatrix(n) {
  const grid = new Array(n)
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n).fill(0)
  }
  grid[0][0] = 1
  let x = 0
  let y = 0
  let total = n * n - 1
  let flag = 0
  let val = 1
  while (total > 0) {
    if (flag % 4 === 0) { // 右移
      while (x < n - 1 && grid[y][x + 1] === 0) {
        grid[y][++x] = ++val
        total--
      }
      flag++
      continue
    }
    if (flag % 4 === 1) { // 下移
      while (y < n - 1 && grid[y + 1][x] === 0) {
        grid[++y][x] = ++val
        total--
      }
      flag++
      continue
    }
    if (flag % 4 === 2) { // 左移
      while (x > 0 && grid[y][x-1] === 0) {
        grid[y][--x] = ++val
        total--
      }
      flag++
      continue
    }
    if (flag % 4 === 3) { // 上移
      while (y > 0 && grid[y-1][x] === 0) {
        grid[--y][x] = ++val
        total--
      }
      flag++
    }
  }

  return grid
}
