/**
 * 快速排序 二分排序 
  1 选择一个基准元素target（一般选择第一个数）
  2 将比target小的元素移动到数组左边，比target大的元素移动到数组右边
  3 分别对target左侧和右侧的元素进行快速排序
 */

function quickSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  function sort(arr) {
    if (arr.length <= 1) return arr;
    const left = []
    const right = []
    const current = arr[0]

    for (let i = 1; i < arr.length; i++) {
      const item = arr[i];
      item > current ? right.push(item) : left.push(item)
    }

    return [...sort(left), current, ...sort(right)]
  }

  return sort(result)
}

function quickSort1(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  function sort(arr) {
    if (arr.length < 2) return arr
    const target = arr[0]
    const left = []
    const right = []
    for (let i = 1; i < arr.length; i++) {
      const item = arr[i];
      item < target
        ? left.push(item)
        : right.push(item)
    }
    return [...sort(left), target, ...sort(right)]
  }

  return sort(result)
}

function quickSort2(arr) {
  if (arr.length < 2) return arr;
  const current = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i]
    if (item < current) {
      left.push(item)
      continue
    }
    right.push(item)
  }
  return quickSort2(left).concat(current, quickSort2(right))
}

function quickSort3(arr) {
  if (arr.length < 2) return arr
  const current = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    item < current
      ? left.push(item)
      : right.push(item)
  }
  return quickSort3(left).concat(current, quickSort3(right))
}


function quickSort4(arr) {
  if (arr.length < 2) return arr
  const first = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < first) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left.concat(first, right))
}

module.exports = quickSort4;
