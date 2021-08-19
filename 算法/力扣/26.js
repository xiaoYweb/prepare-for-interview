/** easy. 删除有序数组中的重复项 双指针
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

  不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

  输入：nums = [1,1,2]
  输出：2, nums = [1,2]
  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。

  输入：nums = [0,0,1,1,1,2,2,3,3,4]
  输出：5, nums = [0,1,2,3,4]
  解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 */
console.log('[1,1,2]', removeDuplicates([1, 1, 2]))
console.log('[0,0,1,1,1,2,2,3,3,4]', removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]))
function removeDuplicates(nums) {
  let len = nums.length;
  for (let i = 0; i < nums.length - 1; i++) {
    const num = nums[i];
    if (num === nums[i + 1]) {
      len--
      nums.splice(i, 1) // 移除元素 位置变化了 索引i 需要前移
      i--
    }
  }
  return len;
}

/**
 * [1,1,2,2,2,3,3,4]
 * 比较的值 比较的索引位置
 * 1       0
 * 1       0
 * 2       1 覆盖操作 覆盖到 前一个索引值 + 1位置
 * 2       1
 * 2       1
 * 3       2  
 * 3       2
 * 4       3
 * slice操作
 */
function removeDuplicates1(nums) {
  if (nums.length === 0) return 0;
  let compareVal = nums[0]
  let compareInenx = 0
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]
    if (compareVal === num) continue
    nums[compareInenx + 1] = num; 
    compareVal = num
    compareInenx++
  }
  // return nums
  return compareInenx + 1
}