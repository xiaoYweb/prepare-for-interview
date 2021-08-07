/** (easy) 哈希解法 
  定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
  你可以假设每种输入只会对应一个答案。但是，
  数组中同一个元素在答案里不能重复出现。
 */


/**
  输入：nums = [2,7,11,15], target = 9
  输出：[0,1]
  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
*/
function fn(nums, target) { // 暴力解法 双循环
  const arr = nums.slice()
  const result = []
  for (let i = 0; i < arr.length - 1; i++) {
    const prev = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (prev + arr[j] === target) {
        return [i, j]
      }
    }
  }
  return result;
}

// console.log('[2, 7, 11, 15] --- 9', fn([2, 7, 11, 15], 9))
// console.log('[2, 7, 11, 15] --- 9', fn([3, 2, 4], 6)) // nums = [3,2,4], target = 6

function twoNums(nums, target) { // 静态哈希表法  前提 数组内的数字不重复
  const mp = new Map()
  nums.forEach((num, i) => {
    mp[num] = i;
    mp.set(num, i)
  });
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diff = target - num;
    const j = mp.get(diff)
    if (j !== undefined && j !== i) {
      return [i, j]
    }
  }
  return []
}
// console.log('[2, 7, 11, 15] --- 9', twoNums([2, 7, 11, 15], 9))
// console.log('[2, 7, 11, 15] --- 9', twoNums([3, 2, 4], 6)) // nums = [3,2,4], target = 6

function func(nums, target) { // 动态哈希表法 进一步优化 前提 数组内的数字不重复
  const mp = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const diff = target - num;
    const j = mp.get(diff)
    if (j !== undefined) { // 存在 而且
      return [j, i]
    } else {
      mp.set(num, i)
    }
  }
  return []
}

console.log('[2, 7, 11, 15] --- 9', func([2, 7, 11, 15], 9))
console.log('[2, 7, 11, 15] --- 9', func([3, 2, 4], 6)) // nums = [3,2,4], target = 6