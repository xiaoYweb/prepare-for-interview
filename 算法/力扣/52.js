/** hard N皇后 II
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

  给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。

  输入：n = 4
  输出：2

  输入：n = 1
  输出：1

  输入：n = 4
  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  解释：如上图所示，4 皇后问题存在两个不同的解法。

  输入：n = 1
  输出：[["Q"]]
  1 <= n <= 9   
  皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
 */
console.log('', totalNQueens(1))
console.log('', totalNQueens(2))
console.log('', totalNQueens(3))
console.log('', totalNQueens(4))
console.log('', totalNQueens(5))
function totalNQueens(n) {
  let result = 0
  const grid = createGrid(n)
  function fn(row) {
    if (row === n) {
      result++
      return
    }
    for (let i = 0; i < n; i++) { // 当前行放置在 哪一列
      if (!isValid(grid, row, i)) continue // 位置不合法跳过当前 摆放
      grid[row][i] = 'Q'
      fn(row + 1)
      grid[row][i] = '.' // 出栈 还原之前的皇后位置
    }
  }
  fn(0)
  return result
}

/**
 * 任何两个皇后都不能处于同一条横行、纵行或斜线上。 > 
 * 1. 一行放一个 (所以 左右2个位置 下方3个位置  无须考虑)
 * 2. 判断三个方向 正上 左上  右上   
 * 3. row col  -> 0 开始
 */
function isValid(grid, row, col) {
  let i = 0
  while (row--) {
    i ++
    if (grid[row][col] === 'Q') return false // 正上方
    if (grid[row][col + i] === 'Q') return false // 右上方 越界 undefined 
    if (grid[row][col - i] === 'Q') return false // 左上方 越界 undefined 
  }
  return true
}

function createGrid(n) {
  const grid = []
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n).fill('.')
  }
  return grid
}