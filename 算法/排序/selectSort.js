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

function selectSort2(arr) {
  if (arr.length < 2) return arr;
  const result = arr.slice()

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[i]) { // 后一项比前一项小
        [result[i], result[j]] = [result[j], result[i]]
      }
    }
  }

  return result;
}


function selectSort3(arr) {
  const list = arr.slice()
  
  for (let i = 0; i < list.length - 1; i++) {
    let minIndex = i // 记录最小索引
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) { // 若果不是自己本身  交互位置
      [list[i], list[minIndex]] = [list[minIndex], list[i]]
    }
  }

  return list
}

module.exports = selectSort3;
