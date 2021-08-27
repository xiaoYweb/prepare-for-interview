/**
 * 数组 有限个 相同类型的 变量 组成的有序集合
 */

/**
 * 找出数组中重复的数字  见 findRepeatNumber.js
 * 在一个长度为n的数组 nums 中 所有数字都在0-n-1范围内。请找出数组中任一重复的数字
 * 输入 [2,3,1,0,2,5,3]
 * 输出 2 或 3
 */


/**
 * 找到所有数组中消失的数字 leetcode 448
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
  输入：nums = [4,3,2,7,8,2,3,1]
  输出：[5,6]
  输入：nums = [1,1]
  输出：[2]
 */

/**
 * 多数元素 leetcode 169
 * 
  给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

  你可以假设数组是非空的，并且给定的数组总是存在多数元素。

  输入：[3,2,3]
  输出：3

  输入：[2,2,1,1,1,2,2]
  输出：2
 */

/**
 * 二维数组 (五子棋棋盘 10*10)  -->> 稀疏数组
 *   0 1 2 3 4 5 6 7 8 9
 * 0 0 0 0 0 0 0 0 0 0 0
 * 1 0 0 0 0 0 0 0 0 0 0
 * 2 0 0 0 0 0 0 0 0 0 0
 * 3 0 0 0 0 0 0 0 0 0 0
 * 4 0 0 0 0 0 0 0 0 0 0
 * 5 0 0 0 0 0 0 0 0 0 0
 * 6 0 0 0 0 0 0 0 0 0 0
 * 7 0 0 0 0 0 0 0 0 0 0
 * 8 0 0 0 0 0 0 0 0 0 0
 * 9 0 0 0 0 0 0 0 0 0 0
 * 
 * 1. 保存非0元素的 位置 
 * 2. 保存原始的行数和列数
 * 行  列  元素值 
 * 10  10   2
 * 
 * 稀疏数组 (n+1)*3 数组 压缩  ---- n为非零元素的个数
 * 1. 第一行 存储总行数 总列数 非零元素的个数
 * 2.   
 */

/**
 * 1. 遍历数组 找到 所有 非零数元素 存储到结果中 
 * 2. 
 */
function arrayToSparse(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === 0) continue
      count++
    }
  }
  const result = create2DArray(count + 1, 3)
  result[0][0] = arr.length; // col
  result[0][1] = arr[0].length; // row
  result[0][2] = count;

  // 遍历数组 找到 非零元素 存储到结果中
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const el = arr[i][j]
      if (el === 0) continue
      index++;
      result[index][0] = i;
      result[index][1] = j;
      result[index][2] = el;
    }
  }
  return result;
}
// 创建二维数组
function create2DArray(row = 10, col = 10) {
  const result = new Array(row)
  for (let i = 0; i < row; i++) {
    result[i] = new Array(col).fill(0)
  }
  return result;
}
function fn() {
  const arr = create2DArray(5, 10)
  arr[1][2] = 1;
  arr[1][3] = 1;
  arr[3][1] = 2;
  arr[2][2] = 2;

  print2DArray(arr)
  const result = arrayToSparse(arr)
  print2DArray(result)
}
function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const list = arr[i];
    let str = ''
    for (let j = 0; j < list.length; j++) {
      const el = list[j];
      str += el + ' '
    }
    console.log(str)
  }
}
// fn()


/**leetcode 26 双指针
 * 给你一个有序数组 nums，使每个元素 只出现一次 ，返回删除后数组的新长度。
  输入：nums = [1,1,2]
  输出：2, nums = [1,2]
  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
 * [1,1,2,2,2,3,3,4]
 * 比较的值 比较的索引位置
 * 1       0
 * 1       0
 * 2       1 覆盖操作 覆盖到 前一个索引值 + 1位置
 * 2       1
 * 2       1
 * 3       2  
 * 3       2
 * 4       3
 * slice操作
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let compareVal = nums[0]
  let compareInenx = 0
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]
    if (compareVal === num) continue
    nums[compareInenx + 1] = num;
    compareVal = num
    compareInenx++
  }
  // return nums
  return compareInenx + 1
}


/** LeetCode 27 
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * [3,2,1,4] 3
 * 元素 索引位置 
 * 3    0       [3,2,1,4]
 * 2    0->1 覆盖索引位置 然后 索引index++ [2,2,1,4]
 * 1    1->2 [2,1,1,4]
 * 4    2->3 [2,1,4,4]
 */
function removeElement(nums, val) { // 
  let index = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === val) continue
    nums[index++] = num
  }
  // return nums.slice(0, index)
  return index
}

/**
 * 遍历到对应位置 若===val  则与最后一个元素 交换位置 len --  i--
 * [2,1,2,2,4] 2  len = 5
 * [4,1,2,2] 2   len = 4
 * ...
 * 
 * [2] 2  
 */
function removeElement(nums, val) {
  if (nums.length === 0) return 0
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    if (num === val) {
      nums[i] = nums[len - 1]
      i--
      len--
    }
  }
  // return nums.slice(0, len)
  return len
}