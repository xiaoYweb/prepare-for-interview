/** easy 有序数组的平方
 * 给你一个按 ((非递减顺序)) 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 ((非递减顺序)) 排序。
 * 
  输入：nums = [-4,-1,0,3,10]
  输出：[0,1,9,16,100]
  解释：平方后，数组变为 [16,1,0,9,100]
  排序后，数组变为 [0,1,9,16,100]

  输入：nums = [-7,-3,2,3,11]
  输出：[4,9,9,49,121]
 */
// console.log('[-4,-1,0,3,10]', sortedSquares([-4,-1,0,3,10]))
// console.log('[-7,-3,2,3,11]', sortedSquares([-7,-3,2,3,11]))
console.log('[-5,-3,-2,-1]', sortedSquares([-5,-3,-2,-1])) // [-5,-3,-2,-1] [-1,-3,-2,25] 

function sortedSquares(nums) { // 由于是递增序列 所以 每次 数组两端平方的结果 其中一个为最大 
  const result = []
  let left = 0
  let right = nums.length - 1
  while(left <= right) {
    const prev = Math.abs(nums[left])
    const next = Math.abs(nums[right])
    // console.log(nums)
    if (prev > next) {
      left ++
      result.unshift(prev * prev)
    } else {
      right --
      result.unshift(next * next)
    }
  }
  
  return  result
}