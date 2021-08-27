/** easy 多数元素
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

  你可以假设数组是非空的，并且给定的数组总是存在多数元素。

  输入：[3,2,3]
  输出：3

  输入：[2,2,1,1,1,2,2]
  输出：2
 */

console.log('', majorityElement([3, 2, 3])) // 3
console.log('', majorityElement([2, 2, 1, 1, 1, 2, 2])) // 2
// 集合 记录
function majorityElement(nums) {
  const mp = {}
  const halfLen = nums.length / 2;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    mp[num] = (mp[num] || 0) + 1;
    if (mp[num] > halfLen) {
      return num;
    }
  }
}

/**
 * 排序 取 中间位置位置(len/2)元素
 * [2,3,3]
 * [1,1,1,2]
 * [2,2,2,1]
 * [1,1,2,2] 这个不是
 */
function majorityElement(nums) {
  nums.sort((a, b) => a - b)
  const halfLen = Math.floor(nums.length / 2)
  if (nums.length % 2 === 0) { // 偶数情况 排除  这种情况[1,1,2,2]
    if (nums[halfLen] !== nums[halfLen - 1]) {
      return -1
    }
  }
  return nums[halfLen]
}
/**
 * 投票算法  此方案的前提条件 给定的数组总是存在多数元素。
 * 将元素当做候选人 如果新元素和候选人相同 次数+1 不同次数-1  如果次数为0 候选人更新
 * [2,2,1,1,1,2,2]
 * 元素   次数   候选人
 * 2      1     2
 * 2      2     2
 * 1      1     2
 * 1      0     清空候选人
 * 1      1     1 重置候选人
 * 2      0     清空候选人
 * 2      1     2
 * 
 * 本质上 多数元素出现的次数总和 一定大于其他元素出现次数的总和 所以候选人的次数经过抵消后 最终剩余的一定是多数元素
 */
function majorityElement(nums) {
  let candidate = -1; // 候选人
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (count === 0) {
      candidate = num;
    }
    if (candidate === num) {
      count++;
    } else {
      count--;
    }
  }
  return candidate;
}


/**
 * [1,1,2]      1  1
 * [1,1,1,2]    1  2
 * [1,2,2,2]    2
 * 
 */
function majorityElement(nums) { // 数组是非空的，并且给定的数组总是存在多数元素 数组中出现次数 大于 ⌊ n/2 ⌋ 的元素
  const index = Math.floor(nums.length / 2)
  nums.sort((a, b) => a - b)
  
  return  nums[index]
}