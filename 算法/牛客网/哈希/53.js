/**
 * BM53 缺失的第一个正整数
 * 给定一个((无重复元素))的整数数组nums，请你找出其中((没有出现的最小的正整数))
 */

// console.log(minNumberDisappeared([1, 0, 2])) // 3
// console.log(minNumberDisappeared([-2, 3, 4, 1, 5])) // 2
// console.log(minNumberDisappeared([4, 5, 6, 8, 9])) // 1
console.log(minNumberDisappeared([3, 2, 1])) // 1

function minNumberDisappeared(nums) {
  const list = Array(nums.length).fill(null)
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    if (num < 1) continue
    list[num - 1] = num
  }
  
  const index = list.findIndex(item => item === null)
  return index === -1 ? list.length + 1 : index + 1
}