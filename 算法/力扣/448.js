/** easy 找到所有数组中消失的数字
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

  输入：nums = [4,3,2,7,8,2,3,1]
  输出：[5,6]
  输入：nums = [1,1]
  输出：[2]
 */

console.log('--', findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))
function findDisappearedNumbers(nums) {
  const set = new Set(nums)

  const reuslt = []
  for (let i = 1; i <= nums.length; i++) {
    !set.has(i) && reuslt.push(i)
  }
  return reuslt;
}

/**
 * 不使用额外的空间
 * 1. 遍历所有元素 找到元素 对应索引位置(元素-1) 上的值(val) 赋值为 -val
 * 2. 遍历完成后 还是为正数的 值对应的索引位置就是 没有出现过的数字
 * [1,2,4,5,1]
 * 1  0  [-1,2,4,5,1]
 * 2  1  [-1,-2,4,5,1]
 * 4  3  [-1,-2,4,-5,1]
 * 5  4  [-1,-2,4,-5,-1]
 */
function findDisappearedNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    const num = Math.abs(nums[i]);
    const target = nums[num - 1]
    if (target < 0) continue; // 为负数则跳过
    // 为非负整数
    nums[num - 1] = - target;
  }
  const result = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) continue; // 为负数则跳过
    result.push(i + 1)
  }
  return result;
}