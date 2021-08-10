/**
 * 冒泡排序
 * 1. 从第一项 开始遍历与后面 一项比较 若 大于 则交换位置 
 * 2. 第一轮遍历完成 最后一位 是最大的项 第二遍遍历值倒数第二项 为止 以此类推
 * 3. 
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()
  for (let i = result.length - 1; i >= 0; i--) { // 循环次数(result.length - 1) 并锁定最后位 下次 不再循环
    for (let j = 0; j < i; j++) {
      // const prev = result[j];
      // const next = result[j + 1];
      // if (prev > next) {
      //   result[j + 1] = prev;
      //   result[j] = next;
      // }
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
      }
    }
  }
  return result;
}

function bubbleSort2(arr) {
  if (arr.length < 2) return arr;
  const result = arr.slice()
  for (let i = result.length; i > 0; i--) { // 循环次数 result.length - 1 次  提供
    for (let j = 1; j < i; j++) {
      if (result[j - 1] > result[j]) {
        [result[j - 1], result[j]] = [result[j], result[j - 1]]
      }
    }
  }
  return result;
}

module.exports = bubbleSort2;