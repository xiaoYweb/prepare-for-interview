/**
 * BM20 数组中的逆序对 mid
 * 
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P mod 1000000007
 * 
 * 题目保证输入的数组中没有的相同的数字 
 * 要求：空间复杂度 O(n)O(n)，时间复杂度 O(nlogn)O(nlogn)
 * 
 * 归并排序 中 归处 进行处理
 */

function InversePairs(data) {
  let res = 0
  sort(data)
  return res

  function sort(data) {
    if (data.length < 2) return data
    const i = Math.floor(data.length / 2)
    const left = data.slice(0, i)
    const right = data.slice(i)
    return merge(sort(left), sort(right))
  }
  function merge(left, right) {
    let result = []
    while (right.length && left.length) {
      // 此处必须是 右边小 也就是 左边数组的所有项 都大于 右边当前项 才计数
      if (right[0] < left[0]) { // 右边小
        res += left.length
        result.push(right.shift())
      } else { // 
        result.push(left.shift())
      }
    }

    result = result.concat(left, right)
    return result
  }
}
// console.log(InversePairs([1]))
// console.log(InversePairs([]))
// console.log(InversePairs([1, 2, 3, 4, 5, 6, 7, 0])) // 7
// console.log(InversePairs([1, 2, 3])) // 0
// console.log(InversePairs([7, 5, 6, 4])) // 5
// console.log(InversePairs([1, 4, 3, 2])) // 3
// console.log(InversePairs([1, 3, 2, 3, 1])) // 4
// const retArr = require('./test')
console.log(InversePairs([627126,415347,850134,371085,279048,705820,453064,944751])) // 4
