/** middle dp 零钱兑换 II
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

  请你计算并返回可以凑成总金额的硬币组合数。如果 ((任何硬币组合都无法凑出总金额，返回 0)) 。

  假设每一种面额的硬币有无限个。

  题目数据保证结果符合 32 位带符号整数。

  输入：amount = 5, coins = [1, 2, 5]
  输出：4
  解释：有四种方式可以凑成总金额：
  5=5
  5=2+2+1
  5=2+1+1+1
  5=1+1+1+1+1

  输入：amount = 3, coins = [2]
  输出：0
  解释：只用面额 2 的硬币不能凑成总金额 3 。

  输入：amount = 10, coins = [10] 
  输出：1

  如果求组合数就是外层for循环遍历物品，内层for遍历背包。

  如果求排列数就是外层for遍历背包，内层for循环遍历物品。
 */
/**
 * [1,2,5] 5
 * 0  0
 * 1  1                 ->  1    1
 * 2  1+1 2             ->  2    11 2
 * 3  1+2(2)            ->  2    111 12
 * 4  2(2)*2(2)    1 3  ->  3    1111 112 22
 * 5  2 * 3             ->  4    11111 1112 122 5
 */
console.log('5, [1,2,5]', change(5, [1, 2, 5])) // 4
console.log('2, [3]', change(2, [3])) // 0
console.log('10, [10]', change(10, [10])) // 1
function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1 // 
  
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin]
    }
  }

  return dp[amount]
};