/** (sasy) 
 * 输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

  要求时间复杂度为O(n)

  输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
  输出: 6
  解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */


/**
  记录一个当前连续子数组最大值 max 默认值为数组第一项
  记录一个当前连续子数组累加值 sum 默认值为数组第一项

  1.从数组第二个数开始，若 sum<0 则当前的sum不再对后面的累加有贡献，sum = 当前数
  2.若 sum>0 则sum = sum + 当前数
  3.比较 sum 和 max ，max = 两者最大值

  * 总结 
  * 1. 如果均为负数 n < 0[]  则 max = 最小的负数 ()
  * 2. 如果均为负数和0   则 max = 0
  * 3. 有正数有负数有0   负数对 sum 有负贡献 
 */
function maxSubArray(nums) {
  if (!Array.isArray(nums) || nums.length === 0) return 0
  let sum = nums[0]
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];
    sum = sum < 0
      ? current
      : sum + current
    console.log('--', current, sum, max)
    max = Math.max(max, sum)
    // if (sum < 0) {
    //   sum = current;
    // } else {
    //   sum += current;
    // }

    // if (sum > max) {
    //   max = sum
    // }
  }
  return max;
}

console.log('maxSubArray', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
/**
 
 */