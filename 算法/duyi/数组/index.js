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
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 0) continue
      count++
    }
  }
  const result = create2DArray(3, arr.length + 1)
  result[0][0] = arr.length;
  result[0][1] = arr[0].length;
  result[0][2] = count;
  
  // 遍历数组 找到 非零元素 存储到结果中
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
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
  const result = new Array(col)
  for (let i = 0; i < col; i++) {
    result[i] = new Array(row).fill(0)
  }
  return result;
}
function fn() {
  const arr = create2DArray()
  arr[1][2] = 1;
  arr[3][1] = 2;
  arr[2][2] = 2;

  // print2DArray(arr)
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
fn()

