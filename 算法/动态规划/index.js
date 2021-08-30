/**
 * 
 */

/**
 * 背包问题 
 * 
 * 
 * 背包 最大容量 
 * 
 * 物品 (体积/重量 价值 数量)
 * 
 * 
 * 数量 === 1 不选 | 选 一个          01背包问题
 * 数量 === InFinity 不选 | 选 n个    完全背包问题
 * 不同的物品数量不同                  多重背包问题
 * 按组打包 每组最多选一个              分组背包
 */

/**
 * 01 背包
 * 有N件物品和一个最多能被重量为W 的背包。
 * 第i件物品的重量是 wt[i]  val[i] 。
 * 每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。
 * 
 * 
 * 
 * wt = [2, 1, 3]
 * val = [4, 3, 3]
 * N = 3 W = 4  --> 6
 * dp[i, w] 对于 前i 个物品 当背包的容量为w时，可以装的最大价值为 dp[i][w]
 * 
 * 状态 
 * 背包的空闲容量 
 * 可选择的物品 
 * 
 * 选择 
 * 物品放进背包 物品不放进背包
 * 
 * dp[3][5] 只用前3个物品&&背包最大容量为5 时  最多可以装下的价值为 6
 * dp[0][..] = 0 i = 0  物品可选数量为 0
 * dp[..][0] = 0 w = 0  背包容量为 0
 * 
 * 在背包w  重量限制下  把物品i放入背包 最大价值是多少  val[i] + dp[i-1][w-wt[i]]
 *              ...   不放入背包 最大价值是多少 dp[i-1][w]
 */
// console.log(bagQuestion(3, 4, [2, 1, 3], [4, 2, 3])) // 6 
// console.log(bagQuestion(3, 5, [2, 3, 3, 1, 2], [1, 2, 4, 2, 3])) // 5 -_- 实际答案应该是 7 此处 ？？
function bagQuestion(N, W, wt, val) { // list: {weith: number, value: number} []
  const dp = new Array(N + 1)
  for (let i = 0; i < N + 1; i++) {
    dp[i] = new Array(W + 1)
    dp[i][0] = 0
  }
  dp[0].fill(0)

  console.log(dp)
  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= W; w++) {
      if (w - wt[i - 1] < 0) { // 超重 不选择将其加入背包
        dp[i][w] = dp[i - 1][w]
      } else { // 可以加入背包
        dp[i][w] = Math.max(
          dp[i - 1][w], // 不把第i个物品 放入背包 就是 前 i-1个物品最大价值
          dp[i - 1][w - wt[i - 1]] + val[i - 1]
        )
      }
    }
  }
  console.log(dp)

  return dp[N][W]
}

/**         0   1   2   3   4   5   6   7   8  ---- W 包的容量
 * wt  val  0   0   0   0   0   0   0   0   0           ---col 物平 的选择 -->  最大选择价值
 * 2    1   0   0   1   1   1   1   1   1   1   
 * 4    5   0   0   0   0   5   5   7   8   10   
 * 3    3
 */
function bagQuestion(N, W, wt, val) { // list: {weith: number, value: number} []
  const dp = new Array(N + 1)
  for (let i = 0; i < N + 1; i++) {
    dp[i] = new Array(W + 1)
    dp[i][0] = 0
  }
  dp[0].fill(0)

  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= W; w++) {
      // 1 当前物品重量 > 背包重量 w  只能不拿 
      if (wt[i] > w) {
        dp[i][w] = dp[i - 1][w]
        continue
      }
      /**
       * 2 当前物品重量 <= 背包重量 w
       * 可以选择拿  也可以选择不拿 
       */
      dp[i][w] = Math.max(
        dp[i-1][w], // 不拿 === 上一个最大价值
        // 拿 
        // dp[i-1][w - dp[]]
      )

    }
  }
  console.log(dp)

  return dp[N][W]
}