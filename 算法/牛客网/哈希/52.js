/**
 * BM52 数组中只出现一次的两个数字
 * 一个整型数组里除了两个数字只出现一次，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字
 * 
 * ((输出时按非降序排列))
 */
console.log(FindNumsAppearOnce([1, 4, 1, 6])) // [4,6]
console.log(FindNumsAppearOnce([1, 2, 3, 3, 2, 9])) // [1,9]

function FindNumsAppearOnce1(array) {
  const mp = {}
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    mp[num] = (mp[num] || 0) + 1
  }

  const keys = Object.keys(mp)
  const result = []
  for (let i = 0; i < keys.length; i++) {
    const num = +keys[i]
    mp[keys[i]] === 1 && result.push(num)
  }

  return result
}
// [1,1,2,2,3,4]
function FindNumsAppearOnce2(array) {
  array.sort((a, b) => a - b)
  const result = []

  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    const lastIndex = array.lastIndexOf(val)
    if (array.indexOf(val) === lastIndex) {
      result.push(val)
    } else {
      i = lastIndex
    }
  }

  return result
}

function FindNumsAppearOnce(array) {
  const result = []

  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    if (array.indexOf(val) === array.lastIndexOf(val)) {
      result.push(val)
    }
  }

  return result
}