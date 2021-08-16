/**
 * leetcode 389 
  给定两个字符串 s 和 t，它们只包含小写字母。

  字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。

  请找出在 t 中被添加的字母。

  输入：s = "abcd", t = "abcde"
  输出："e"
  解释：'e' 是那个被添加的字母。

  输入：s = "", t = "y"
  输出："y"

  输入：s = "a", t = "aa"
  输出："a"

  输入：s = "ae", t = "aea"
  输出："a"
 */
// 哈希法
function findTheDifference(s, t) {
  if (s.length === 0) {
    return t[0]
  }
  const mp = {}
  for (let i = 0; i < s.length; i++) {
    const x = s[i];
    mp[x] = (mp[x] || 0) + 1
  }
  // 次数为 负数 或者 值为undefined 则 返回该字符
  for (let i = 0; i < t.length; i++) {
    const val = t[i];
    const n = mp[val]
    if (n === undefined || n === 0) return val
    mp[val]--;
  }
}
console.log('', findTheDifference('abcd', 'abcde'))
console.log('', findTheDifference('', 'y'))
console.log('', findTheDifference('a', 'aa'))
console.log('', findTheDifference('ae', 'aea'))
console.log('', findTheDifference('aa', 'aea'))

// 字符串的替换方法
function findTheDifference(s, t) {
  for (let i = 0; i < s.length; i++) {
    const val = s[i];
    t = t.replace(val, '')
  }
  return t;
}

// ASCII 换算成 数字计算 相减后的 diff 差 === 小写字母
// function findTheDifference(s, t) {

// }

// 异或运算 二进制运算 
// 0 ^ 1 = 1 ^ 0 = 1 两者不同
// 0 ^ 0 = 1 ^ 1 = 0 两者相同
// a ^ b ^ c ^ b ^ a = (a ^ b) ^ (b ^ a) ^ c = c
function findTheDifference(s, t) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res ^= s[i].charCodeAt()
  }
  for (let i = 0; i < t.length; i++) {
    res ^= t[i].charCodeAt();
  }
  return String.fromCharCode(res);
}
