/**
 * BM63 跳台阶
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 */

/**
 * 
 * 1  1   1
 * 2  2   11  2
 * 3  3   111 21 12 
 * 4  5   1111 211 121 112 22
 * 5  8   11111 2111  1211 1121 1112 221 212 122 
 * 6  13   111111  21111*5  2211 2121  2112  1221 1212 1122 222 
 */
console.log(jumpFloor(42))
console.log(jumpFloor(43))
console.log(jumpFloor(44))
console.log(jumpFloor(45))
// console.log(jumpFloor(5))
// console.log(jumpFloor(7))
function jumpFloor(number) {
  const dp = [1,2]
  for (let i = 2; i < number; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[number - 1]
}