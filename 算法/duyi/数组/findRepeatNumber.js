/**
 * 找出数组中重复的数字 
 * 在一个长度为n的数组 nums 中 所有数字都在0-n-1范围内。请找出数组中任一重复的数字
 * 输入 [2,3,1,0,2,5,3]
 * 输出 2 或 3
 */

console.log('--', findRepeatNumber([2, 3, 1, 0, 2, 5, 3]))
// 集合的解法 obj mp set 
function findRepeatNumber(nums) {
  const mp = {}
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (mp[num]) return num;
    mp[num] = 1;
  }
  return -1;
}
// 先排序后查找 排序后重复元素相邻
function findRepeatNumber(nums) {
  const list = nums.slice()
  list.sort((a, b) => a - b)
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] === list[i + 1]) return list[i]
  }
  return -1;
}

// 临时数组 类似 集合解法
function findRepeatNumber(nums) {
  const list = new Array(nums.length)
  for (let i = 0; i < nums.length - 1; i++) {
    const num = nums[i]
    if (list[num]) return num;
    list[num] = 1;
  }
  return -1;
}

// 使数组 内出现的数字 对应到 索引位置  ----- 交互位置 
/**
 * 1. 当前位置的元素 和 索引 是否相同  不同 则交互位置 再次 遍历当前位置 若相同 则下一个遍历
 * 2. 若当前位置和交互位置 相同 则跳出遍历
 */
function findRepeatNumber(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    const num = nums[i]
    if (num === i) continue; // 元素与索引位置不相等 下一轮遍历

    const target = nums[num]
    if (num === target) return num; //

    //  元素与索引位置不匹配  交换位置
    nums[i] = target;
    nums[num] = num;
    i--
  }
  return -1;
}