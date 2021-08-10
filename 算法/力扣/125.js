/** 验证回文串 (easy) 运用双向队列的思路
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

    说明：本题中，我们将空字符串定义为有效的回文串。

    输入: "A man, a plan, a canal: Panama"
    输出: true
    解释："amanaplanacanalpanama" 是回文串

    输入: "race a car"
    输出: false
    解释："raceacar" 不是回文串
 */

/**
* @param {string} s
* @return {boolean}
*/
function isPalindrome(str) {
  let newStr = str.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
  while (newStr.length > 1) { // 空字符串 或者 长度为 1 均为回文
    const left = newStr.slice(0, 1)
    const right = newStr.slice(-1)
    if (left !== right) return false;
    newStr = newStr.slice(1, - 1)
  }
  return true;
}
console.log('A man, a plan, a canal: Panama', isPalindrome('A man, a plan, a canal: Panama'))
console.log('ab_a', isPalindrome('ab_a'))