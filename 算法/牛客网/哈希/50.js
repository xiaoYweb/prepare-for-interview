/**
 * BM50 两数之和
 * 给出一个整型数组 numbers 和一个目标值 target，请在数组中找出两个加起来等于目标值的数的下标，
 * 返回的下标按 ((((升序排列))))。
 */


// 存在重复

console.log(twoSum([3, 2, 4], 6)) // [2,3]
console.log(twoSum([20, 70, 110, 150], 90)) // [1,2]
console.log(twoSum([0, 4, 3, 0], 0)) // [1,4]
function twoSum(nums, target) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    const dis = target - nums[i]
    if (typeof mp[dis] !== 'undefined' && mp[dis] !== i) {
      return [mp[dis] + 1, i + 1]
    }
    mp[nums[i]] = i
  }
  return []
}