/** middle 岛屿数量
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

  岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

  此外，你可以假设该网格的四条边均被水包围。

  输入：grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  输出：1

  输入：grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  输出：3

  tip:
  m == grid.length
  n == grid[i].length
  1 <= m, n <= 300
  grid[i][j] 的值为 '0' 或 '1'
 */
test()
/**
 * 
 */
function numIslands(grid) {
  let total = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      total += dfs(i, j, grid)
    }
  }
  return total
}

function dfs(y, x, grid) {
  if (x < 0 || y < 0 || y >= grid.length || x >= grid[y].length || grid[y][x] === '0') {
    return 0
  }
  grid[y][x] = '0' // 沉岛思维 直接覆盖为 水
  
  dfs(y + 1, x, grid)
  dfs(y - 1, x, grid)
  dfs(y, x + 1, grid)
  dfs(y, x - 1, grid)

  return 1
}

function test() {
  const grid1 = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
  ]
  console.log('1 --> ', numIslands(grid1))
  const grid2 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
  ]
  console.log('3 --> ', numIslands(grid2))
}