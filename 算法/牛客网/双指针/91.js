/**
 * BM91 反转字符串
 * 写出一个程序，接受一个字符串，然后输出该字符串反转后的字符串。（字符串长度不超过1000）
 *  0 <= n <= 1000
 * 要求：空间复杂度 O(n)，时间复杂度 O(n)
 */

function solve(str) {
  const len = str.length
  let res = ''
  for (let i = len - 1; i>=0; i--) {
    res += str[i]
  }
  return res
}

console.log(solve('abcd')) // 'dcba'