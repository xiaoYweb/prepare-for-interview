/**
 * BM88 判断是否为回文字符串
 * 给定一个长度为 n 的字符串，请编写一个函数判断该字符串是否回文。如果是回文请返回true，否则返回false。

字符串回文指该字符串正序与其逆序逐字符一致。
 0 < n <= 10 ^ 6
"absba"
"ranko"
"yamatomaya"
 */

function judge(str) {
  const len = str.length 
  if (str.length === 1) return true
  let x = Math.floor(len / 2)
  let l = 0, r = len - 1;
  while(x--) {
    if (str[l ++] !== str[r --]) return false
  }
  return true
}
console.log(judge('absba')) // true
console.log(judge('ranko')) // false
console.log(judge('yamatomaya')) // false