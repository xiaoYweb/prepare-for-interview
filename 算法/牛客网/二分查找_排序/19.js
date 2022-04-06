/**BM19 寻找峰值 mid
 * 给定一个长度为n的数组nums，请你找到峰值并返回其索引。数组可能包含多个峰值，在这种情况下，返回任何一个所在位置即可。
1.峰值元素是指其值严格大于左右相邻值的元素。严格大于即不能有等于
2.假设 nums[-1] = nums[n] = -\infty−∞
3.对于所有有效的 i 都有 nums[i] != nums[i + 1]
4.你可以使用O(logN)的时间复杂度实现此问题吗？
2*10^5 >= nums.length >= 1
 */

// [2,4,1,2,7,8,4] -> 1 | 5   4和8都是峰值元素，返回4的索引1或者8的索引5都可以  
// [1,2,3,1] -> 2    3 是峰值元素，返回其索引 2
// [1,4,2,1] -> 1

function findPeakElement(nums) {
  let index = 0
  while(nums.length) {
    if (nums.length === 1) { //
      return index
    }
    const i = Math.floor(nums.length / 2)
    const mid = nums[i]
    const prev = nums[i - 1]
    // 不存在 mid === prev
    if (mid > prev) {
      index = index + i // 位置计算 需注意边界
      nums = nums.slice(i) // 此处要包含大的项 进行 切割 
    } else {
      nums = nums.slice(0, i)
    }
  }
}
console.log(findPeakElement([2,4,1,2,7,8,4]))
console.log(findPeakElement([1,2,3,1]))
console.log(findPeakElement([1,4,3,1]))