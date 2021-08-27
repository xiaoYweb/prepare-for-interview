/** easy 爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
  给定 n 是一个正整数。


  输入： 2
  输出： 2
  解释： 有两种方法可以爬到楼顶。
  1.  1 阶 + 1 阶
  2.  2 阶

  输入： 3
  输出： 3
  解释： 有三种方法可以爬到楼顶。
  1.  1 阶 + 1 阶 + 1 阶
  2.  1 阶 + 2 阶
  3.  2 阶 + 1 阶
 */
/**
 * 4 - 5
 * 1111
 * 211 * 3
 * 22  
 * 
 * 5  - 8
 * 11111
 * 2111 * 4
 * 221 * 3
 */
 console.log('2', climbStairs1(2)) // 2
 console.log('3', climbStairs1(3)) // 3
 console.log('4', climbStairs1(4)) // 5
 console.log('5', climbStairs1(5)) // 8
// 递归法
function climbStairs(n) {
  if (n <= 3) return n
  return climbStairs(n - 2) + climbStairs(n - 1)
}
// 动态规划
function climbStairs1(n) {
  if (n <= 3) return n
  const result = new Array(n)
  result[0] = 1
  result[1] = 2
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n - 1]
}

function climbStairs(n) {
  if (n <= 3) return n
  let a = 1
  let b = 2
  let c = 3
  for (let i = 2; i < n; i++) {
    c = a + b
    a = b
    b = c
  }
  return c
}