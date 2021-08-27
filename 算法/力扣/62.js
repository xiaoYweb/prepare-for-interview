/** middle 不同路径  dp || 递归
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

  机器人每次  ((只能向下或者向右))  ((移动一步)) 。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

  问总共有多少条不同的路径？

  输入：m = 3, n = 7
  输出：28

  输入：m = 3, n = 2
  输出：3
  解释：
  从左上角开始，总共有 3 条路径可以到达右下角。
  1. 向右 -> 向下 -> 向下
  2. 向下 -> 向下 -> 向右
  3. 向下 -> 向右 -> 向下

  输入：m = 7, n = 3
  输出：28

  输入：m = 3, n = 3
  输出：6

  tip: 
  1 <= m, n <= 100
  题目数据保证答案小于等于 2 * 109
 */

/**
 * 1 2  -->>  1
 * 2 2  -->>  2   ===   {1 2} + {2 1}  <2>
 * 2 3  -->>  3   ===   {1 3} + {2 2}  ===  {1 3} + {1 2} + {1 2} <3>
 * 2 4  -->>  4   ===   {1 4} + {2 3}  === {1 4} + {1 3} + {1 2} + {1 2} <4>
 * 3 3  -->>  6   ===   {2 3} + {3 2}  === {1 3} + {1 2} + {1 2} * 2 <6>
 * 3 4  -->>  10  ===   1 + 3 + 6  ===  {2 4} + {3 3} 
 * 3 5  -->>  14  ===   {2 4} + {3 4}
 * 4 4  -->>  20  ===   {3 4} + {4,3}
 */
console.log('3,7', uniquePaths(3, 7)) // 28
console.log('3,2', uniquePaths(3, 2)) // 3
console.log('7,3', uniquePaths(7, 3)) // 28
console.log('3,3', uniquePaths(3, 3)) // 6
console.log('3,3', uniquePaths(1, 1)) // 6
console.log('51,9', uniquePaths(51, 9)) // 6 递归方案存在 栈溢出 
function uniquePaths(m, n) { // m -> y轴  n -> x轴  递归方案
  if (m > n) { // 确保前者更小
    [m, n] = [n, m]
  }
  if (m === 1) return 1
  if (m === 2 && n === 2) return 2
  return uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
}

function uniquePaths(m, n) { // 递归方案 增加缓存 减少计算次数   还是不行 哈哈、 、、
  const mp = {}
  function fn(m, n) {
    if (m > n) { // 确保前者更小
      [m, n] = [n, m]
    }
    if (m === 1) return 1
    if (m === 2 && n === 2) return 2
    const key = `${m}${n}`
    if (mp[key]) return mp[key]
    const res = uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
    mp[key] = res
    return res
  }
  return fn(m, n)
}

function uniquePaths(m, n) { // 动态规划  图
  const dp = new Array(m)
  //  {1,2} {1,3}... {2,1} {3,1} ... -> 1
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n)
    dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}