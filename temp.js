function twoSum(nums, target) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const val = target - num
    const matchedIndex = mp[val]
    // console.log('matchedIndex, i', matchedIndex, i)
    if (typeof matchedIndex !== 'undefined') return [matchedIndex, i]
    mp[num] = i
  }
  return []
}

// console.log(twoSum([2,7,11,15], 9))
// console.log(twoSum([3,2,4], 6))
// console.log(twoSum([3,3], 6))

/**
 * 双指针 
 * 循环 i 站1位 剩余的用 left right 指针
 * 
 * 
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
function threeSum(nums, target = 0) {
  if (nums.length < 3) return []
  const numsList = nums.slice().sort((a, b) => a - b)
  const result = []
  // 循环 i 到 数组 倒数第三位  剩余2位 留2个指针位
  for (let i = 0; i < numsList.length - 2; i++) {
    if (i && numsList[i] === numsList[i - 1]) continue // 跳过重复
    let l = i + 1
    let r = numsList.length - 1
    while (l < r) {
      const sum = numsList[i] + numsList[l] + numsList[r]
      if (sum < target) {
        l++
      } else if (sum > target) {
        r--
      } else {
        // 相等情况 添加结果 && 双指针 箱内 移动1位
        result.push([numsList[i], numsList[l++], numsList[r--]])
        // 与前一位 相同
        while (numsList[l] === numsList[l - 1]) {
          l++
        }
        // 与前一位 相同
        while (numsList[r] === numsList[r + 1]) {
          r--
        }
      }
    }
  }
  return result
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4])) // [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]


function lengthOfLongestSubstring(s) {
  const len = s.length
  if (len < 2) return len
  let maxLen = 0
  let start = 0
  const mp = {}
  for (let i = 0; i < len; i++) {
    const char = s[i];
    // 存在重复 将start指针 指向 2中情况 abba 在索引时 可能会往前索引  start 只能往后 赋值
    if (mp[char] !== undefined) {
      // start = Math.max(mp[char] + 1, start)
      start = mp[char] + 1 // abba 情况会出现问题 3
    }
    mp[char] = i
    if (maxLen > len - start) return maxLen // 剩余遍历的长度 小于 maxLen  直接返回 
    maxLen = Math.max(maxLen, i + 1 - start) // 计算 最大长度 与 遍历位置 - 开始位置   取最大值 
  }
  return  maxLen
}

console.log(lengthOfLongestSubstring('abcabcbb')) // abcabcbb  3
console.log(lengthOfLongestSubstring('abba')) // abba  2
console.log(lengthOfLongestSubstring('abccba')) // abccba  3
console.log(lengthOfLongestSubstring('bbbbb')) // bbbbb  1
console.log(lengthOfLongestSubstring('pwwkew')) // pwwkew  3