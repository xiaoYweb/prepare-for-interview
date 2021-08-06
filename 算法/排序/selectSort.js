/**
 * 选择排序
 * 1. 第一次遍历 第二项开始 与第一项开始比较 小于第一项 交换位置 
 * 2. 第二次遍历 第一项是最小的  从第二项开始 以此类推
 */

function selectSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      // const prev = result[i]
      // const next = result[j]
      // if (prev > next) {
      //   result[j] = prev;
      //   result[i] = next;
      // }
      if (result[i] > result[j]) {
        [result[i], result[j]] = [result[j], result[i]]
      }
    }
  }
  return result
}

function selectSort1(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[i] > result[j]) {
        [result[i], result[j]] = [result[j], result[i]]
      }
    }
  }

  return result
}

module.exports = selectSort1;
