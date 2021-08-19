/** middle 无重复字符的最长子串
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

  输入: s = ""
  输出: 0
 */

function lengthOfLongestSubstringError(s) { // 未考虑 dvdf 这种情况
  let mp = {}
  let maxLen = 0
  let count = 0
  for (let i = 0; i < s.length; i++) {
    const x = s[i];
    if (!mp[x]) { // 不同 
      mp[x] = 1;
      count++
    } else { // 相同
      i--
      mp = {}
      count = 0;
    }
    maxLen = Math.max(maxLen, count)
  }
  return maxLen
}

console.log('abcabcbb', lengthOfLongestSubstring('abcabcbb')) // 3
console.log('bbbbb', lengthOfLongestSubstring('bbbbb')) // 1
console.log('pwwkew', lengthOfLongestSubstring('pwwkew')) // ! -- 3
console.log('', lengthOfLongestSubstring('')) // 0
console.log(' ', lengthOfLongestSubstring(' ')) // ! -- 1
console.log('-------------')
console.log('dvdf', lengthOfLongestSubstring('dvdf')) // ! -- 3

function lengthOfLongestSubstring(s) {
  let maxLen = 0
  let mp = {}
  const len = s.length;
  for (let i = 0; i < len; i++) {
    if (maxLen >= len - i) break // 最长字符串长度 >= 剩余遍历长度
    for (let j = i; j < len; j++) {
      const val = s[j];
      
      if (!mp[val]) {
        mp[val] = 1;
        maxLen = Math.max(maxLen, j - i + 1)
      } else {
        mp = {}
        maxLen = Math.max(maxLen, j - i + 1)
        break
      }
    }
  }
  return maxLen;
}