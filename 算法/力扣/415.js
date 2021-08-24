/** easy 字符串相加
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 * 
  num1 和num2 的长度都小于 5100
  num1 和num2 都只包含数字 0-9
  num1 和num2 都不包含任何前导零
  你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

 */
console.log('addStrings', addStrings('1123', '2'))
console.log('addStrings', addStrings('1123', '8877'))
// console.log('addStrings', addStrings('1123', '2'))
function addStrings(num1, num2) { // '1123' '2'
  function addString(minNum, maxNum) {
    const minLen = minNum.length
    const maxLen = maxNum.length
    const disLen = maxLen - minLen
    const result = new Array(maxLen)
    let x = 0
    for (let i = maxLen - 1; i >= 0; i--) {
      const maxNumItem = maxNum[i]
      const minNumItem = minNum[i - disLen] // 存在负数索引 返回 undefined
      const sum = add(minNumItem, maxNumItem) + x
      result[i] = sum % 10
      x = sum >= 10 ? 1 : 0
    }
    if (x === 1) { // 若遍历完成 后 x === 1  则需要在 最前面+一位
      result.unshift(1)
    }
    // console.log('result', result)
    return result.join('')
  }


  function add(a = 0, b = 0) {
    return Number(a) + Number(b)
  }

  return num1.length < num2.length
    ? addString(num1, num2)
    : addString(num2, num1)
}