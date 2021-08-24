/** easy 最大子序和 分治
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 * 
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6
    解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

    输入：nums = [1]
    输出：1

    输入：nums = [0]
    输出：0
    输入：nums = [-1]
    输出：-1
 */
console.log('', maxSubArray([-2, -1, -3])) // -1
console.log('', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 6
console.log('', maxSubArray([-2])) // -2
console.log('', maxSubArray([0])) // 0
console.log('', maxSubArray([-999999])) // -999999
function maxSubArray(nums) { // 若 加 - 负数 说明是走下坡路 
  let max = -Infinity
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    sum += num;
    max = Math.max(max, sum)
    if (sum < 0) { // ??
      sum = 0
    }
  }
  return max
}