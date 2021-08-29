/** easy 斐波那契数
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是
 * F(0) = 0，F(1) = 1
   F(n) = F(n - 1) + F(n - 2)，其中 n > 1


    输入：2
    输出：1
    解释：F(2) = F(1) + F(0) = 1 + 0 = 1

    输入：3
    输出：2
    解释：F(3) = F(2) + F(1) = 1 + 1 = 2

    输入：4
    输出：3
    解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 */
console.log('2', fib(2))
console.log('3', fib(3))
console.log('4', fib(4))
console.log('5', fib(5))
function fib(n) { // // 时间复杂度 O(n2)
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}
function fib(n, cache = new Array(n + 1)) { // 时间复杂度 O(n) 空间复杂度 O(n)
  if (n === 0) return 0
  if (n === 1) return 1
  if (cache[n]) return cache[n]
  caches[n] = fib(n - 1) + fib(n - 2)
  return cache[n]
}
function fib(n) { // 时间复杂度 O(n) 空间复杂度 O(1)
  const result = new Array(n + 1)// n === 4 ---> [0,1,2,3,4] len === n+1 === 5
  result[0] = 0
  result[1] = 1
  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n]
}