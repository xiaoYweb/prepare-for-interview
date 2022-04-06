/**
 * BM54 三数之和
 * 给出一个有n个元素的数组S，S中是否有元素a,b,c满足a+b+c=0？找出数组S中所有满足条件的三元组
 */


console.log(threeSum([-10, 0, 10, 20, -10, -40])) // [[-10,-10,20],[-10,0,10]]
// console.log(threeSum([-2, 0, 1, 1, 2])) // [[-2,0,2],[-2,1,1]]
// console.log(threeSum([0, 0])) // []

function threeSum(nums, target = 0) {
  if (nums.length < 3) return []
  nums.sort((a, b) => a - b)

  const result = []
  for (let i = 0; i < nums.length - 2; i++) {
    if (i && nums[i] === nums[i - 1]) continue // 跳过重复项
    const num = nums[i];
    let left = i + 1
    let right = nums.length - 1
    const dis = target - num
    while (left < right) {
      if (nums[left] + nums[right] === dis) {
        result.push([num, nums[left++], nums[right--]])
        while (nums[left] === nums[left - 1]) { // 跳过重复项
          left++
        }
        while (nums[right] === nums[right + 1]) { // 跳过重复项
          right--
        }
      } else if (nums[left] + nums[right] < dis) {
        left++
      } else {
        right--
      }
    }
  }

  return result
}