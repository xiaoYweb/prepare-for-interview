/** easy 判定是否互为字符重排
 * 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。
 * 
  输入: s1 = "abc", s2 = "bca"
  输出: true 
  输入: s1 = "abc", s2 = "bad"
  输出: false
  
  思路本质上 判断2个字符串字符出现个数是否相等
 */

console.log('', CheckPermutation('abc', 'bca'))
console.log('', CheckPermutation('abc', 'bad'))
/**
 * 集合法
 */
function CheckPermutation(s1, s2) {
  if (s1.length !== s2.length) return false;
  const mp = {}
  for (let i = 0; i < s1.length; i++) {
    const char = s1[i];
    mp[char] = (mp[char] || (mp[char] = 0)) + 1
  }
  for (let i = 0; i < s2.length; i++) {
    const char = s2[i];
    if (!mp[char]) return false
    mp[char]--
  }
  return true
}
/**
 * 排序
 */
function CheckPermutation(s1, s2) {
  if (s1.length !== s2.length) return false;
  function sortStr(str) {
    return str.split('')
      .sort((a, b) => a.charCodeAt() - b.charCodeAt())
      .join('')
  }
  return sortStr(s1) === sortStr(s2)
}