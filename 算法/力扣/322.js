/** 零钱兑换 (middle) 贪心算法 | 动态规划
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

  计算并返回可以凑成总金额所需的 ((最少的硬币个数)) 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

  你可以认为每种硬币的数量是无限的。

  输入：coins = [1, 2, 5], amount = 11
  输出：3
  解释：11 = 5 + 5 + 1

  输入： coins = [2], amount = 3
  输出：-1
  输入：coins = [1], amount = 0
  输出：0
  输入：coins = [1], amount = 1
  输出：1
  输入：coins = [1], amount = 2
  输出：2
 */
console.log('[1, 2, 5], 11', coinChange([1, 2, 5], 11)) // 3
console.log('[2], 3', coinChange([2], 3)) // -1
console.log('[1], 0', coinChange([1], 0)) // 0
console.log('[1], 1', coinChange([1], 1)) // 1
console.log('[1], 2', coinChange([1], 2)) // 2

function coinChange(coins, amount) { // 递归解决 
  if (amount === 0) return 0
  if (amount < 0) return -1
  let min = +Infinity

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const rest = amount - coin
    const subProblem = coinChange(coins, rest)
    if (subProblem === -1) continue
    min = Math.min(
      min,
      subProblem + 1
    )
  }

  return min === Infinity ? - 1 : min
}

/**
 * fn(11) = fn(10) + fn(9) + fn(6)
 * fn(10) = ....
 * fn(6) = 
 */
function coinChange(coins, amount) { // 递归 + 缓存 
  const caches = new Array(amount + 1)

  function change(rest) { // 返回次数
    if (rest === 0) return 0
    if (rest < 0) return - 1
    let min = Infinity
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const money = rest - coin
      if (caches[money] === undefined) {
        caches[money] = change(money)
      }
      const subProblem = caches[money]
      // const subProblem = change(money)
      if (subProblem === -1) continue // 零钱计算不符合 跳过此次循环
      min = Math.min(min, subProblem + 1)
    }
    return min
  }

  min = change(amount)

  return min === Infinity ? -1 : min
}

function coinChange(coins, amount) { // 自底向上 迭代解法
  const dp = new Array(amount + 1).fill(amount + 1) // 初始化dp数组 由于coin 面值 最低1元 所以 fill amount + 1 次 最大次数
  dp[0] = 0

  // 遍历所有状态左右取值 
  for (let i = 0; i < dp.length; i++) {
    // 求取 0 - amount  所需的最小找零次数 求取 0 - amount  所需的最小找零次数 
    for (let j = 0; j < coins.length; j++) {
      const coin = coins[j];
      if (i - coin < 0) continue // 子问题无解
      dp[i] = Math.min(
        dp[i], // 若没取值 则为 amount + 1
        dp[i - coin] + 1 // 此处索引i - coin >= 0 求取 0 - amount  所需的最小找零次数 
      )
    }
  }

  return dp[amount] === amount + 1 ? - 1 : dp[amount]
}

function coinChange(coins, amount) {
  if (amount === 0) return 0
  if (amount < 0) return - 1
  let min = Infinity // 最小零钱 个数 

  for (let i = 0; i < coins.length; i++) {
    const subProblem = coinChange(coins, amount - coins[i])
    if (subProblem === - 1) continue // 跳过 找零 不符合条件的情况 
    min = Math.min(
      min,
      subProblem + 1
    )
  }

  return min === Infinity ? - 1 : min
}

function coinChange(coins, amount) {
  if (amount < 0) return - 1
  const dp = new Array(amount + 1).fill(amount + 1) // 由于最小硬币单位为1所以 最大次数不超过amount + 1  
  dp[0] = 0
  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] < 0) continue
      if (dp[i - coins[j]] === amount + 1) continue
      dp[i] = dp[i - coins[j]] + 1
    }
  }

  return dp[amount] === amount + 1 ? - 1 : dp[amount]
}