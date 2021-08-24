/** easy 合并两个有序数组
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列

  注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 

  输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
  输出：[1,2,2,3,5,6]
  解释：需要合并 [1,2,3] 和 [2,5,6] 。
  合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。

  输入：nums1 = [1], m = 1, nums2 = [], n = 0
  输出：[1]
  解释：需要合并 [1] 和 [] 。
  合并结果是 [1] 。

  输入：nums1 = [0], m = 0, nums2 = [1], n = 1
  输出：[1]
  解释：需要合并的数组是 [] 和 [1] 。
  合并结果是 [1] 。
  注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。

 */

// console.log('', merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))
// console.log('', merge([1], 1, [], 0))
// console.log('', merge([0], 0, [1], 1))
console.log('', merge([-1, -1, 0, 0, 0, 0], 4, [-1, 0], 2))
// console.log('', merge([4, 5, 5, 0, 0, 0], 3, [1, 2, 3], 3)) 
/**
 * 合并在排序
 */
function merge(nums1, m, nums2, n) {
  if (n === 0) return nums1
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i]
  }
  nums1.sort((a, b) => a - b)
  return nums1
}
// [1,2,0,0,0] [7,8,9]
function merge(nums1, m, nums2, n) {
  if (n === 0) return nums1
  let len = m + n;
  const nums3 = nums1.slice(0, m)
  while (nums3.length && nums2.length) {
    len--
    if (nums3[nums3.length - 1] > nums2[nums2.length - 1]) {
      nums1[len] = nums3.pop()
      continue
    }
    nums1[len] = nums2.pop()
  }
  while (nums2.length) {
    len--
    nums1[len] = nums2.pop()
  }
  while (nums3.length) {
    len--
    nums1[len] = nums3.pop()
  }
  return nums1
}

function merge(nums1, m, nums2, n) {
  if (n = 0) return nums1
  let index = nums1.length - 1
  while (m && nums2.length) {
    if (nums1[m - 1] < nums2[nums2.length - 1]) {
      nums1[index--] = nums2.pop()
    } else {
      m--
      nums1[index--] = nums1[m]
    }
  }
  while (m--) {
    nums1[index--] = nums1[m]
  }
  while (nums2.length) {
    nums1[index--] = nums2.pop()
  }
  return nums1
}


function merge(nums1, m, nums2, n) {
  if (n === 0) return nums1
  let len = n + m // 最后索引位

  while (nums2.length) { // 若 nums2.length 为0 则表示 已经排序完成
    len--
    const num1 = nums1[m - 1] === undefined // 索引越界
      ? -Infinity 
      : nums1[m - 1]
      
    const num2 = nums2[nums2.length - 1]
    nums1[len] = num1 > num2
      ? nums1[--m]
      : nums2.pop()
  }
  return nums1
}