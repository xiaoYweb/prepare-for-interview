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
console.log('aab', partition('aab'))
/**
 * aab  ->  a + ab  ->   -> a a b
 *  
 * 
 */
function partition(s) {
  const result = []
  const path = []
  function fn(s) { // aab  ->  a + ab || aa b ->  aa b -> a a b
    if (s.length === 0) return
    for (let i = 1; i < s.length; i++) {
      const prev = s.slice(0, i) // 前半部分 不允许切割 
      const rest = s.slice(i)
      if(!isVaild(prev)) continue // 跳过这种切割 

      // 前半部分是回文 看看后半部
      path.push(prev)
      fn(rest)
      console.log(path)
      path.pop()
      // result.push(Array.from(path))
    }
  }
  fn(s)

  return result
}
// console.log('a', isVaild('a'))
// console.log('ab', isVaild('ab'))
// console.log('aba', isVaild('aba'))
// console.log('abba', isVaild('abba'))
// console.log('aabb', isVaild('aabb'))
function isVaild(s) {
  if (s === '') return false
  const len = s.length
  if (len === 1) return true
  let n = Math.floor(len / 2)
  for (let i = 0; i < n; i++) {
    if (s[i] !== s[len - 1 - i]) return false
  }
  return true
}