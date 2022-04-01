/**
 * 插入排序
 * 1. 从第二项 开始遍历与前面每一项项目 若比前一项小 (则交换位置 直到 比前一项大或者 到头了停止)  继续向后遍历 
 * 2. 从第三项开始 以此类推
 * 3. 
 * 
 * 重点 第一次 向前一个对比 如果大于前一个 则 直接停止本轮循环 如果小于 然后继续 
 */
// 插入法
function insertSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()
  for (let i = 1; i < result.length; i++) {
    const current = result[i]

    for (let j = i - 1; j >= 0; j--) { // j 为前面对比项
      const prev = result[j]
      if (j === i - 1 && current >= prev) { // 第一次对比 比前一项大情况下 跳出循环 无须移动位置
        break
      }
      if (current >= prev) { // 第二次及以上次对比 比前一项小的情况大 则与前一项的位置插入 此处需要注意 会引起其他项的索引值变化
        const insertIndex = j + 1;
        const item = result.splice(i, 1) // 移除item
        result.splice(insertIndex, 0, item[0]) // 插入item
        break
      }
      if (j === 0) { // 直到第一项都没有 比current大的 则 直接跟第一项交换位置
        const insertIndex = j;
        const item = result.splice(i, 1) // 移除item
        result.splice(insertIndex, 0, item[0]) // 插入item
      }
    }

  }

  return result
}

/**
 * 插入排序 不断交换位置
 * 1. 从第二项开始 不断向前对比 比前一项小交换位置 
 * 2. 对比项 交换位置后 由于 向前一位所以 在与前一位比较 类似冒泡排序
 */
function insertSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  for (let i = 1; i < result.length; i++) {
    let currentIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      const current = result[currentIndex];
      const prev = result[j];
      if (current < prev) {
        result[j] = current;
        result[currentIndex] = prev;
        currentIndex = j;
      } else {
        break
      }

    }
  }

  return result;
}

// 由于 上面这种情况 坑定是 相邻对比 不然 就会跳出内循环  优化代码 
// 时间复杂度：O(n2) 空间复杂度:O(1)
function insertSort(arr) {
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  for (let i = 1; i < result.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const current = result[j + 1];
      const prev = result[j];
      if (current < prev) {
        result[j] = current;
        result[j + 1] = prev;
      } else {
        break
      }

    }
  }

  return result;
}

function insertSort1(arr) { // 相较前一项小 则 交互位置 
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  for (let i = 1; i < result.length; i++) {
    for (let j = i; j > 0; j--) {
      if (result[j] < result[j - 1]) {
        [result[j - 1], result[j]] = [result[j], result[j - 1]]
      } else {
        break
      }
    }

  }

  return result;
}

function insertSort2(arr) { // 相较前一项小 则 交互位置 
  if (!Array.isArray(arr)) return
  const result = arr.slice()

  for (let i = 1; i < result.length; i++) {
    const current = result[i]
    for (let j = i - 1; j >= 0; j--) {
      const prev = result[j]
      if (j === i - 1 && prev <= current) { // 前面数组 最后一项
        break
      }

      if (prev <= current) { // 插入
        const items = result.splice(i, 1)
        result.splice(j + 1, 0, items[0])
        break
      }

      if (j === 0 && prev > current) { // 前面数组 第一项 插入
        const items = result.splice(i, 1)
        result.splice(0, 0, items[0])
      }
    }
  }

  return result;
}


function inertSort3(arr) {
  if (arr.length < 2) return arr;
  const result = arr.slice()

  for (let i = 1; i < result.length; i++) {
    for (let j = i; j > 0; j--) {
      if (result[j] < result[j - 1]) { // 后一项 < 前一项
        [result[j - 1], result[j]] = [result[j], result[j - 1]]
      } else {
        break
      }
    }
  }
  return result;
}


function insertSort(arr) {
  const list = arr.slice()

  for (let i = 1; i < list.length; i++) { // 从第二项开始 
    const right = list[i]
    for (let j = i - 1; j >= 0; j--) { // 逐级向前对比 知道 没有前一项更小 停止 
      if (list[j] > right) { // 此处 即时替换位置
        [list[j], list[j + 1]] = [list[j + 1], list[j]]
      } else {
        break
      }
    }
  }

  return list
}


module.exports = inertSort3;