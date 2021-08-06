// 数组去重
function unique(arr) {
  return [...new Set(arr)]
  return Array.from(new Set(arr))
}

// 理由 mao key 唯一性 循环数组
function unique(arr) {
  const mp = new Map()
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (mp.get(element)) continue
    mp.set(element, 1)
    result.push(element)
  }
  return result;

  return arr.filter(item => {
    if (mp.get(element)) return false
    mp.set(element, 1)
    return true
  })
}

// 双循环
function unique(arr) {
  const result = arr.slice()
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (arr[i] !== arr[j]) continue
      result.splice(j, 1)
      j --
    }
  }
  return result;
}