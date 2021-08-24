/** middle 数组中的第K个最大元素
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

  输入: [3,2,1,5,6,4] 和 k = 2
  输出: 5

  输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
  输出: 4
 */
console.log('', findKthLargest([3, 2, 1, 5, 6, 4], 2)) // 5
console.log('', findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) // 4
console.log('', findKthLargest([1], 1)) // 1
function findKthLargest(nums, k) {
  let n = 4000
  function sort(nums) {
    if (nums.length < 2) return nums;
    const i = Math.floor(nums.length / 2)
    const left = nums.slice(0, i)
    const right = nums.slice(i)
    return merge(sort(left), sort(right))
  }
  function merge(left, right) {
    const result = []
    while (left.length && right.length) {
      result.push(
        left[0] > right[0] 
        ? left.shift()
        : right.shift()
      )
    }

    while(left.length) {
      result.push(left.shift())
    }

    while(right.length) {
      result.push(right.shift())
    }

    return result
  }
  const list = sort(nums)

  return k <= list.length
    ? list[k - 1]
    : null
}
