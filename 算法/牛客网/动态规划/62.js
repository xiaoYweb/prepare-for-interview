/**
 * 'BM62 斐波那契数列
 * 
 */

// function Fibonacci(n) {
//   if (n < 3) return 1
//   return Fibonacci(n - 1) + Fibonacci(n - 2)
// }
console.log(Fibonacci(1))
console.log(Fibonacci(2))
console.log(Fibonacci(3))
console.log(Fibonacci(4))
console.log(Fibonacci(5))
function Fibonacci(n) {
  if (n <= 2) return 1
  const dp = [1, 1]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n - 1]
}