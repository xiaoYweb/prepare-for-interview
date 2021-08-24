/** middle 比较版本号
 * 给你两个版本号 version1 和 version2 ，请你比较它们。

  版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33 和 0.1 都是有效的版本号。

  比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1 的修订号分别为 0 和 1 ，0 < 1 。

  输入：version1 = "1.01", version2 = "1.001"
  输出：0
  解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"


  输入：version1 = "1.0", version2 = "1.0.0"
  输出：0
  解释：version1 没有指定下标为 2 的修订号，即视为 "0"

  输入：version1 = "0.1", version2 = "1.1"
  输出：-1
  解释：version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。0 < 1，所以 version1 < version2

  输入：version1 = "1.0.1", version2 = "1"
  输出：1

  输入：version1 = "7.5.2.4", version2 = "7.5.3"
  输出：-1
 */
console.log('compareVersion', compareVersion('1.01', '1.001')) // 0
console.log('compareVersion', compareVersion('1.0', '1.00')) // 0
console.log('compareVersion', compareVersion('0.1', '1.001')) // -1
console.log('compareVersion', compareVersion('1', '1.001')) // -1
console.log('compareVersion', compareVersion('7.5.2.4', '7.5.3')) // -1
console.log('compareVersion', compareVersion('1.02', '1.00012')) // -1
console.log('compareVersion', compareVersion('1.1', '1.10')) // -1
function compareVersion(version1, version2) {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')

  function compareArr(arr1, arr2) {
    const times = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < times; i++) {
      const str1 = arr1[i]
      const str2 = arr2[i]
      const res = compareNuberString(str1, str2)
      if (res !== 0) {
        return res
      }
    }
    return 0
  }

  function compareNuberString(str1 = '', str2 = '') { // 001 === 01  00002 < 012   1.1 < 1.10
    const re = /^[0]+/g
    str1 = str1.replace(re, '')
    str2 = str2.replace(re, '')
    if (str1.length !== str2.length) {
      return str1.length > str2.length ? 1 : - 1
    }
    if (str1 === str2) return 0
    str1 = Number(str1 || 0)
    str2 = Number(str2 || 0)
    return str1 > str2 ? 1 : - 1
  }


  return compareArr(arr1, arr2)
}

// console.log('compareNuberString', compareNum('01', '001')) // 0
// console.log('compareNuberString', compareNum('00002', '0012')) // -1

function compareNuberString(str1, str2) { // 001 === 01  00002 < 012  
  const re = /[0]+/g
  str1 = str1.replace(re, '')
  str2 = str2.replace(re, '')
  if (str1.length !== str2.length) {
    return str1.length > str2.length ? 1 : - 1
  }
  if (str1 === str2) return 0
  str1 = Number(str1 || 0)
  str2 = Number(str2 || 0)
  return str1 > str2 ? 1 : - 1
}