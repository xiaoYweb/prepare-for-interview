/** middle 分割回文串
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案
 * 
 * 回文串 是正着读和反着读都一样的字符串
 * 
  输入：s = "aab"
  输出：[["a","a","b"],["aa","b"]]
  输入：s = "a"
  输出：[["a"]]

  1 <= s.length <= 16
  s 仅由小写英文字母组成
  回文定义 'a' 'aa' 'aba' 
 */
// console.log('aab', partition('aab'))
// console.log('acb', partition('acb'))
// console.log('a', partition('a'))
// console.log('abb', partition('abb'))
// console.log('abba', partition('abba'))
console.log('abbab', partition('abbab'))
/**
 * aab  ->  a + ab  ->   -> a a b
 *  
 * 
 */
function partition(s) {
  const result = []
  const path = []
  function fn(s) { // aab  ->  a + ab || aa b ->  aa b -> a a b
    if (s.length === 0) { // 切割至末尾 所以 前面切割的均为 回文 
      result.push(path.slice())
      return
    }
    if (s.length === 1) { // 切割至最后一位 前面切割的均为 回文 
      result.push(path.concat(s))
      return 
    }
    if (isValid(s)) { // 切割剩余的 或 一开始 就是回文 
      result.push(path.concat(s))
    }
    for (let i = 1; i < s.length; i++) {
      const prev = s.slice(0, i) // 前半部分 不允许切割 
      
      const rest = s.slice(i)
      console.log("🚀prev", prev, rest)
      if (!isValid(prev)) continue // 前半部分 不是回文  跳过当前循环
      
      // 前半部分是回文 看看后半部
      path.push(prev)
      fn(rest)
      path.pop()
    }
  }
  fn(s)

  return result
}
// console.log('a', isValid('a'))
// console.log('ab', isValid('ab'))
// console.log('aba', isValid('aba'))
// console.log('abba', isValid('abba'))
// console.log('aabb', isValid('aabb'))
function isValid(s) {
  if (s === '') return false // 空是否为 回文 ？
  const len = s.length
  if (len === 1) return true
  let n = Math.floor(len / 2)
  for (let i = 0; i < n; i++) {
    if (s[i] !== s[len - 1 - i]) return false
  }
  return true
}