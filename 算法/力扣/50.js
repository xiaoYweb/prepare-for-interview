/** 第一个只出现一次的字符 (easy) 哈希
 * 在字符串 s 中找出 第一个 只出现一次 的字符。如果没有，返回一个单空格。 s 只包含小写字母。
 * 
  s = "abaccdeff"
  返回 "b"

  s = "" 
  返回 " "
 */


/** 时间复杂度 O(2n) 空间复杂度 O(n)
 * 思路 遍历一次 计算对应字符出现次数 
 * 再遍历一次 找出第一个出现一次的字符 返回 
 */
function firstUniqChar1(str) {
  if (typeof str !== 'string' && str.length > 0) return '';
  const mp = {}
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    mp[letter] = (mp[letter] || (mp[letter] = 0)) + 1;
  }
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    if (mp[letter] === 1) {
      return letter;
    } 
  }
  return ''
}

/** 时间复杂度 O(n2) 空间复杂度 0 
 * 思路 遍历一次  
 */
function firstUniqChar(str) {
  if (typeof str !== 'string' && str.length > 0) return '';
  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    if (str.indexOf(letter)=== str.lastIndexOf(letter)) {
      return letter;
    }
  }
  return '';
}

console.log('firstUniqChar', firstUniqChar('abaccdeff'))