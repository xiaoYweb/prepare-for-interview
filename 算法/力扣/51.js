/** hard N 皇后
 *
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

  给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

  每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

  输入：n = 4
  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  解释：如上图所示，4 皇后问题存在两个不同的解法。

  输入：n = 1
  输出：[["Q"]]
  1 <= n <= 9   
  皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
 */
// console.log('1',solveNQueens(1))
// console.log('2',solveNQueens(2))
// console.log('3',solveNQueens(3))
// console.log('4',solveNQueens(4))
console.log('5',solveNQueens(5))
// console.log('6',solveNQueens(6))
// console.log('7',solveNQueens(7))
// console.log('8',solveNQueens(8))
/**
 * 思路 皇后 不能同时 出现在 上下左右 斜上下左右 8个位置 4条直线位置
 * 1. 每行 1 个换后 
 * 2. 从上到下放一个皇后 
 * 每放一个皇后 判断(三个方向 由于1，2步骤 排除了5个方向) 上 斜左上 斜右上  有木有 皇后 
 */
function solveNQueens(n) {
  const result = []
  const grid = createGrid(n)

  function func(row) {
    if (row === n) {
      result.push(grid.map(list => list.join('')))
    }
    for (let i = 0; i < n; i++) {
      if (isValid(grid, row, i)) { // 没有 符合条件的 位置 则 不会递归到最后一步 得到结果 
        grid[row][i] = 'Q'
        func(row + 1)
        grid[row][i] = '.'
      }
    }
  }

  func(0)

  return result
}

// 创建棋盘
function createGrid(n) {
  const grid = []
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n).fill('.')
  }
  // console.log(grid)
  return grid
}
// 判断当前位置皇后是否 符合条件
function isValid(grid, y, x) {
  let n = y // y - 0  是第一层 
  let i = 0
  while (n--) { // 循环 上方层数
    i++
    if (grid[n][x] === 'Q') return false // 正上
    if (grid[n][x + i] === 'Q') return false // 右上
    if (grid[n][x - i] === 'Q') return false // 左上
  }
  return true
}