/** easy 二分查找
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

  输入: nums = [-1,0,3,5,9,12], target = 9
  输出: 4
  解释: 9 出现在 nums 中并且下标为 4

  输入: nums = [-1,0,3,5,9,12], target = 2
  输出: -1
  解释: 2 不存在 nums 中因此返回 -1

  tip:
  你可以假设 nums 中的所有元素是不重复的。
  n 将在 [1, 10000]之间。
  nums 的每个元素都将在 [-9999, 9999]之间。
 */

console.log('[-1,0,3,5,9,12], 9', binarySearch([-1, 0, 3, 5, 9, 12], 9)) // 4
console.log('[-1,0,3,5,9,12], 2', binarySearch([-1, 0, 3, 5, 9, 12], 2)) // -1
console.log('[-1,0,3,5,9,12], 2', binarySearch([2, 5], 2)) // 0

function binarySearch(nums, target) { // 二分 左闭右闭 []
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let i = Math.floor(right - left / 2)
    const val = nums[i]
    if (val === target) return i
    if (val > target) { // 大于取 前半段
      right = i - 1
    } else {
      left = i + 1
    }
  }
  return -1
}

function binarySearch(nums, target) { // 二分 左闭右开 [)
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    let i = Math.floor(right - left / 2) - 1
    const val = nums[i]
    if (val === target) return i
    if (val > target) { // 大于取 前半段
      right = i
    } else {
      left = i + 1
    }
  }
  return -1
}