/** middle 长度最小的子数组  左右指针 队列 
 *  给定一个含有 n 个正整数的数组和一个正整数 target 。

  找出该数组中
  ((满足其和 ≥ target 的长度))
  最小的 
  连续子数组 
  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

  输入：target = 7, nums = [2,3,1,2,4,3]
  输出：2
  解释：子数组 [4,3] 是该条件下的长度最小的子数组。

  输入：target = 4, nums = [1,4,4]
  输出：1

  输入：target = 11, nums = [1,1,1,1,1,1,1,1]
  输出：0

  提示: 
  1 <= target <= 109
  1 <= nums.length <= 105
  1 <= nums[i] <= 105
 */

/**
 * 排序 然后 从大到小开始减 错误思路 由于要求是 连续的子序列
 */
console.log('minSubArrayLen', minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2
console.log('minSubArrayLen', minSubArrayLen(4, [1, 4, 4])) // 1
console.log('minSubArrayLen', minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])) // 0
console.log('minSubArrayLen', minSubArrayLen(213, [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12])) // 8
function minSubArrayLen(target, nums) {
  if (nums.length === 0) return 0
  let min = nums.length + 1 // 最小次数 
  let sum = 0 // 和
  let prev = 0 // 左指针
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    sum += num

    if (sum >= target) { // 符合条件
      min = Math.min(min, i - prev + 1)
      sum = sum - nums[prev] - num // 减回去
      i-- // 右指针不动
      prev++ // 左指针右移
    }
  }

  return min === nums.length + 1 ? 0 : min
}

// 队列来记录相加items
function minSubArrayLen(target, nums) {
  if (nums.length === 0) return 0
  const queue = []
  let sum = 0
  let min = nums.length + 1

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    sum += num
    queue.push(num)
    if (sum >= target) {
      min = Math.min(min, queue.length)
      i--
      queue.pop()
      sum = sum - queue.shift() - num
    }
  }

  return min === nums.length + 1 ? 0 : min
}

function minSubArrayLen(target, nums) {
  let minLen = nums.length - 1
  let prevIndex = 0
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (sum + num >= target) { // 满足 >= target  记录最小 长度
      minLen = Math.min(minLen, i - prevIndex + 1)
      sum = sum - nums[prevIndex]
      prevIndex++
      i--
      continue
    }
    sum += num
  }

  return minLen === nums.length - 1 ? 0 : minLen
}

function minSubArrayLen(target, nums) {
  let l = 0
  let r = 0
  let len = nums.length
  let minLen = len + 1
  let sum = 0
  while (r < len) {
    const num = nums[r++]
    sum += num
    while (sum >= target) {
      minLen = Math.min(minLen, r - l)
      sum -= nums[l++]
    }
  }

  return minLen > len ? 0 : minLen
}