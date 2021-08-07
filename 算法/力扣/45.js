/**
 * 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 * 
  输入: [10,2]
  输出: "102"
  输入: [3,30,34,5,9]
  输出: "3033459"
 */

function minNumber(nums) {
  if (!Array.isArray(nums) || nums.length === 0) return '';
  const result = nums.slice()
  result.sort(compareFn)
  function compareFn(a, b) {
    const x = '' + a + b
    const y = '' + b + a
    return x - y
  }
  return result.join('')
}

console.log('minNumber', minNumber([3,30,34,5,9,1111]))
/**
 * 总结 位数一致 (数组拼接后的数字长度一致) 所以最小
 * 此处没有考虑 0的情况 是否能放到第一位
 */

