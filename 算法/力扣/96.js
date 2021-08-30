/** middle dp 不同的二叉搜索树
 * 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
 * 
  输入：n = 3
  输出：5
  输入：n = 1
  输出：1
  
  1 <= n <= 19
 */
console.log(2, numTrees(2))
console.log(3, numTrees(3))
console.log(4, numTrees(4))
console.log(5, numTrees(5))
/**
 * 0 1
 * 1 1
 * 2 2
 * 3 5
 * 4 14
 */
function numTrees(n) {
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] +=  dp[j - 1] * dp[i - j];
    }
  }
  return dp[n]
}
