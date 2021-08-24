/** easy 判定字符是否唯一
  实现一个算法，确定一个字符串 s 的所有字符是否全都不同。

  输入: s = "leetcode"
  输出: false
  输入: s = "abc"
  输出: true

 */

// console.log('leetcode', isUnique('leetcode'))
// console.log('abc', isUnique('abc'))
console.log('aa', isUnique('aa'))
/**
 * 集合法
 */
function isUnique(s) {
  if (s.length === 0) return true
  const mp = {}
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const val = mp[char]
    if (val) return false
    mp[char] = 1;
  }
  return true
}

/**
 * 字符串的替换方法 str.replace 
 */
function isUnique(s) {
  const len = s.length;
  if (len === 0) return true
  for (let i = 0; i < len - 1; i++) {
    const char = s[i];
    const newStr = s.slice(i + 1)
    if (newStr.replace(char, '').length < len - i - 1) {
      return false
    }
  }
  return true
}
