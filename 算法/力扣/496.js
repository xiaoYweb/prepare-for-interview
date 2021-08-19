/** easy 下一个更大元素 I
 *  给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。

请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。

nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。


输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
  对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
  对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
  对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。

  提示
  nums1 中的所有整数同样出现在 nums2 中
  nums1和nums2中所有整数 互不相同 用 mp 隐射
*/

/**
 * 暂时 忽略 nums1 直接求取 nums中值的下一个更大值
 * [2,3,5,1,0,7,4]
 * [2] -> 3 
 * [3] -> 4
 * [5] -> 1
 * [5, 1] -> 0
 * [5,1,0] -> 7
 * [7] -> 4 
 * [7,4] -> ... 
 * mp = {
 *  2: 3
 * }
 */
class MyStack {
  constructor() {
    this.index = -1
  }
  push(val) {
    this[++this.index] = val
    return val
  }
  pop() {
    if (this.index < 0) return
    const val = this[this.index]
    delete this[this.index--]
    return val
  }
  size() {
    return this.index + 1
  }
  isEmpty() {
    return this.index === -1
  }
  peek() {
    if (this.isEmpty()) return
    return this[this.index]
  }
}
console.log('', nextGreaterElement([4, 1, 2], [1, 3, 4, 2]))
function nextGreaterElement(nums1, nums2) {
  const result = new Array(nums1.length)
  const mp = {} // 前提数组内的数字 不重复
  const stack = new MyStack()

  for (let i = 0; i < nums2.length; i++) {
    const num = nums2[i];
    while (!stack.isEmpty() && num > stack.peek()) {
      mp[stack.pop()] = num
    }
    // 新元素更小 直接入栈 等待遍历到较大元素
    stack.push(num)
  }
  while (!stack.isEmpty()) {
    mp[stack.pop()] = -1
  }
  for (let i = 0; i < nums1.length; i++) {
    result[i] = mp[nums1[i]]
  }

  return result
}