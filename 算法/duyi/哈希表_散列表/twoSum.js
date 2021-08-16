/**
 * 两数之和 LeetCode 1
 * 1. 暴力破解  两次 for 循环 相加之和是否 === sum
 * 2. 静态哈希
 * 3. 动态哈希
 */

function twoSum(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
}

// 静态哈希
function twoSum(nums, target) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    mp[nums[i]] = 1;
  }
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const index = mp[target - num]
    if (index !== undefined && index !== i) {
      return [index, i]
    }
  }
  return []
}

// 动态哈希
function twoSum(nums, target) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diff = target -  num;
    const targetIndex = mp[diff]
    if (targetIndex !== undefined) { // 找到
      return [targetIndex, i]
    }
    mp[num] = i;
  }
  return []
}
