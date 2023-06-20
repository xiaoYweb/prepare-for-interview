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
  if (s.length === 0) return 0
  let maxLen = 0
  let mp = {}
  let count = 0
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const index = mp[char]
    if (index === undefined) {
      mp[char] = i
      count++
      continue
    }
    maxLen = Math.max(maxLen, count)
    count = 0
    i = index; // 指针重新指向上一次重复的字符位置
    mp = {} // 清空缓存
  }
  return Math.max(Object.keys(mp).length, maxLen)
}

console.log('abcabcbb', lengthOfLongestSubstring('abcabcbb')) // 3
console.log('bbbbb', lengthOfLongestSubstring('bbbbb')) // 1
console.log('pwwkew', lengthOfLongestSubstring('pwwkew')) // ! -- 3
console.log('', lengthOfLongestSubstring('')) // 0
console.log(' ', lengthOfLongestSubstring(' ')) // ! -- 1
console.log('dvdf', lengthOfLongestSubstring('dvdf')) // ! -- 3
console.log('cdd', lengthOfLongestSubstring('cdd')) // ! -- 2
console.log('cddc', lengthOfLongestSubstring('cddc')) // ! -- 2

function lengthOfLongestSubstring(s) {
  if (s === '') return 0
  let prev = 0
  let maxLen = 0
  const len = s.length
  const mp = {}
  for (let i = 0; i < len; i++) {
    const char = s[i];
    const index = mp[char]
    if (index !== undefined) { // 出现重复 左指针 索引指向上一个重复位置后一位
      prev = Math.max(index + 1, prev) // 存在索引指针 前移情况 abba第的2个a索引为0+1 之前的索引为1+1  所以 取最大值  
    }
    mp[char] = i
    maxLen = Math.max(maxLen, i - prev + 1)
    if (maxLen >= len - prev) {
      return maxLen
    }
  }
  return maxLen
}
// cddc  注意 左指针从d->c 索引位不能往前 所以去最大值  
function lengthOfLongestSubstring(s) {
  if (s === '') return 0
  let prev = 0
  let maxLen = 0
  const len = s.length
  const mp = {}
  for (let i = 0; i < len; i++) {
    const char = s[i];
    
    if (mp[char] !== undefined) { // 出现重复
      prev = Math.max(mp[char] + 1, prev)
    }
    mp[char] = i
    maxLen = Math.max(maxLen, i - prev + 1)
    if (len - prev <= maxLen) { // 剩余为遍历的长度 小于当前最大字符串长度  直接返回
      return maxLen
    }
  }

  return maxLen
}

// 
/**
 * 1. 上一个位置 不是重复的索引开始 而是上一次重复的字符位置后一位开始
 * 2. 当前的最大长度 >= len - prev 则直接返回最大值 （此处容易理解为 len - i）
 * @param {*} s 
 * @returns 
 */
function lengthOfLongestSubstring(s) {
  let len = s.length
    if (len <= 1) return len
    let mp = {}
    let result = 0
    let prev = 0
    for (let i = 0; i < len; i++) {
        if (result >= len - prev) return result
        const val = s[i]
        if (mp[val] !== undefined) {
            result = Math.max(result, i - prev)

            prev = mp[val] + 1 // 指向与之前重复索引的下一位

            i = mp[val]
            mp = {}
            continue
        } else {
            result = Math.max(result, i - prev + 1)
            mp[val] = i
        }
    }
    return result
}