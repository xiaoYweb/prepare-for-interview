/** middle 不同路径 II
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

  机器人每次只能 ((向下或者向右)) ((移动一步)) 。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

  网格中的障碍物和空位置分别用 1 和 0 来表示。

  输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
  输出：2
  解释：
  3x3 网格的正中间有一个障碍物。
  从左上角到右下角一共有 2 条不同的路径：
  1. 向右 -> 向右 -> 向下 -> 向下
  2. 向下 -> 向下 -> 向右 -> 向右

  输入：obstacleGrid = [[0,1],[0,0]]
  输出：1

  提示 
  m == obstacleGrid.length
  n == obstacleGrid[i].length
  1 <= m, n <= 100
  obstacleGrid[i][j] 为 0 或 1
 */
console.log('[[0,0,0],[0,1,0],[0,0,0]]', uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])) // 2
console.log('[[0,1],[0,0]]', uniquePathsWithObstacles([[0, 1], [0, 0]])) // 1
console.log('[[0,1],[0,0]]', uniquePathsWithObstacles([[1, 0]]))
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = new Array(m)
  dp[0] = new Array(n)
  dp[0][0] = obstacleGrid[0][0] === 1 ? 0 : 1
  for (let i = 1; i < m; i++) {
    dp[i] = new Array(n)
    if (obstacleGrid[i][0] === 1) {
      dp[i][0] = 0
      continue
    }
    dp[i][0] = dp[i - 1][0]

  }
  for (let i = 1; i < n; i++) {
    if (obstacleGrid[0][i] === 1) {
      dp[0][i] = 0
      continue
    }
    dp[0][i] = dp[0][i - 1]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = obstacleGrid[i][j] === 1
        ? 0
        : dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}