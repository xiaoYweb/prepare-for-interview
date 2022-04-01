/**
 * 归并排序
 * 分割 选择数组中点 二分 不断递归二分 直到 数组长度 > 2
 * 归并 2个超拆分的数组 合并到一个数组 按顺序排列 由于拆分的最小数组归并时已经排过顺序 所以 递归归并的2个数组本身存在顺序
 * 由于是 中间二分 所以 2个对比数组最多length 只差1位
 */

function mergeSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  function sort(arr) {
    if (arr.length < 2) return arr;
    const index = Math.floor(arr.length / 2)
    const left = arr.slice(0, index)
    const right = arr.slice(index)
    return merge(sort(left), sort(right))
  }

  function merge(left, right) {
    const list = []
    while (left.length && right.length) {
      list.push(
        left[0] < right[0] ? left.shift() : right.shift()
      )
    }
    while (left.length) {
      list.push(left.shift())
    }
    while (right.length) {
      list.push(right.shift())
    }
    return list;
  }

  return sort(result)
}


function mergeSort2(arr) {
  function sort(arr) {
    if (arr.length < 2) return arr;
    const i = Math.floor(arr.length / 2)
    const left = arr.slice(0, i)
    const right = arr.slice(i)

    return merge(sort(left), sort(right))
  }
  function merge(left, right) {
    const res = []
    while (left.length && right.length) {
      res.push(
        left[0] < right[0]
          ? left.shift()
          : right.shift()
      )
    }
    while (left.length) {
      res.push(left.shift())
    }
    while (right.length) {
      res.push(right.shift())
    }
    return res;
  }

  return sort(arr);
}

function mergeSort(arr) {
  if (arr.length < 2) return arr
  const list = arr.slice()

  function sort(list) {
    if (list.length < 2) return list
    const i = Math.floor(list.length / 2)
    const left = list.slice(0, i)
    const right = list.slice(i)
    return merge(sort(left), sort(right))
  }

  function merge(left, right) { // 合并2个有序数组 
    let result = []

    while (left.length && right.length) {
      result.push(
        left[0] < right[0]
          ? left.shift()
          : right.shift()
      )
    }
    if (left.length) {
      result = result.concat(left)
    }
    if (right.length) {
      result = result.concat(right)
    }

    return result
  }

  return sort(list)
}

module.exports = mergeSort2;
