/**BM17 二分查找-I easy 
 * 请实现无重复数字的升序数组的二分查找

给定一个 元素升序的、无重复数字的整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标（下标从 0 开始），否则返回 -1
    0 <= len <= 2*10^5  数组值 val <= 10^9
    进阶：时间复杂度 O(\log n)O(logn) ，空间复杂度 O(1)O(1)
 */
// [1,2,3] 3
function search1(nums, target) {
  let len = nums.length
  if (len === 0) return -1
  const i = Math.floor(len / 2)

  if (nums[i] === target) return i // equal

  if (nums[i] < target) {
    const x = search(nums.slice(i + 1), target)
    return x === -1 ? -1 : x + i + 1
  }

  const x = search(nums.slice(0, i), target)
  return x === -1 ? -1 : x
}
console.log(search([1, 2, 3], 1)) // 0
console.log(search([1, 2, 3], 2)) // 1
console.log(search([1, 2, 3], 3)) // 2
console.log(search([1, 2, 3], 4)) // -1
console.log(search([1, 2, 3], 2.1)) // -1
console.log(search([1, 2, 3], 0)) // -1

function search(nums, target) {
  let index = 0
  while(nums.length) {
    const i = Math.floor(nums.length / 2)
    if (nums[i] === target) {
      return index + i
    }
    if (nums[i] < target) {
      nums = nums.slice(i + 1)
      index = index + i + 1
    } else {
      nums = nums.slice(0, i)
    }
  }
  return -1
}