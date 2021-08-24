/** middle 长度最小的子数组  左右指针 队列 
 *  给定一个含有 n 个正整数的数组和一个正整数 target 。

  找出该数组中
  满足其和 ≥ target 的长度
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
 */

/**
 * 排序 然后 从大到小开始减
 */
console.log('minSubArrayLen', minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2
console.log('minSubArrayLen', minSubArrayLen(4, [1, 4, 4])) // 1
console.log('minSubArrayLen', minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])) // 0
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