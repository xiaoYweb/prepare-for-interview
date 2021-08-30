/** middle dp 整数拆分
 *  给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
 * 
  输入: 2
  输出: 1
  解释: 2 = 1 + 1, 1 × 1 = 1。

  输入: 10
  输出: 36
  解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36

  说明: 你可以假设 n 不小于 2 且不大于 58。
 */
/**
 * 2 ---  1               -- 1
 * 3 ---  1 * 2           -- 2
 * 4 ---  2 * 2           -- 4
 * 5 ---  2 * 3           -- 6
 * 6 ---  3 * 3           -- 9
 * 7 ---  4 * 3           -- 12
 * 8 ---  2 * 3 * 3       -- 18  5(6) * 3(2)    4(4) * 4(4) 
 * 9 ---  3 * 3 * 3       -- 27  4(4) * 5(6)    3(2) * 6(9)
 * 10 --  3 * 3 * 4       -- 36
 * 11 --  5(6) * 6(9)     -- 54
 */
// console.log(2, integerBreak(2))
// console.log(3, integerBreak(3))
// console.log(4, integerBreak(4))
// console.log(5, integerBreak(5))
console.log(10, integerBreak(10))

function integerBreak(n) {
  const dp = new Array(n + 1).fill(0)
  dp[1] = 0
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      // const a = Math.max(j, dp[j])
      // const b = Math.max(i - j, dp[i - j])
      // dp[i] = Math.max(dp[i], a * b)
      dp[i] = Math.max(
        dp[i],
        j * (i - j), // 2 数相乘
        dp[i - j] * j, // 取其中一个数拆分后的乘积
        // dp[j] * (i - j), // 取其中一个数拆分后的乘积 由于for循环所以取 一边就可以了 3({1,2}{2,1})
        dp[i - j] * dp[j] // 取其中2个数拆分后的乘积
      ) //
    }
  }
  
  return dp[n]
}