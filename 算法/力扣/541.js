/** easy 反转字符串 II
 * 定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。
 * 
  如果剩余字符少于 k 个，则将剩余字符全部反转。
  如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。

  输入：s = "abcdefg", k = 2
  输出："bacdfeg"

  输入：s = "abcd", k = 2
  输出："bacd"
 */
// console.log('abcdefg', reverseStr('abcdefg', 2)) // ba cd fe g 
// console.log('abcd', reverseStr('abcd', 2)) // bacd
// console.log('abc def gef qs', reverseStr('abcdefgefqs', 3)) // cba def feg qs
// console.log('abcd', reverseStr('abcd', 4)) // cba def feg qs
console.log('abcdefg', reverseStr('abcdefg', 8)) // cba def feg qs
function reverseStr(s, k) {
  const i = 0
  let result = ''
  const left = i * k * 2
  const middle = left + k
  const right = left + k * 2
  console.log(left, middle, right)
  while (s.length > 0) {
    const s1 = s.slice(left, middle)
    const s2 = s.slice(middle, right)

    result += (fn(s1) + s2)
    console.log(s1, s2)

    s = s.slice(right)
  }

  function fn(s) {
    let len = s.length
    if (len <= 1) return s
    let list = s.split('')

    for (let i = 0; i < len; i++) {
      [list[i], list[len - 1]] = [list[len - 1], list[i]]
      len--
    }

    return list.join('')
  }

  return result
}

function reverseStr(s, k) {
  const len = s.length;
  if (len <= 1) return s
  let list = s.split('')
  let i = 0

  const n = Math.floor(k / 2)

  while (true) {
    const l = i * k * 2
    if (l > len) break
    
    for (let i = 0; i < n; i++) {
      const prevIndex = i + l;
      const lastIndex = k - i - 1 + l;
      console.log(prevIndex, lastIndex)
      const temp = list[prevIndex]
      list[prevIndex] = list[lastIndex] 
      list[lastIndex] = temp
      // [ list[prevIndex], list[lastIndex] ] = [ list[lastIndex], list[prevIndex] ] 
      // Cannot set property 'c' of undefined
    }

    i++
  }

  return list.join('')
}