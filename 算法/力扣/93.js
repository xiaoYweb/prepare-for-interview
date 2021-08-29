/** middle 复原 IP 地址 回溯
 * 给定一个只包含数字的字符串，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案。

  有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

  例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。


  输入：s = "25525511135"
  输出：["255.255.11.135","255.255.111.35"]

  输入：s = "0000"
  输出：["0.0.0.0"]

  输入：s = "1111"
  输出：["1.1.1.1"]

  输入：s = "010010"
  输出：["0.10.0.10","0.100.1.0"]

  输入：s = "101023"
  输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

 */
/**
 * 切割三刀
 */
console.log('25525511135', restoreIpAddresses('25525511135'))
console.log('0000', restoreIpAddresses('0000'))
console.log('1111', restoreIpAddresses('1111'))
console.log('010010', restoreIpAddresses('010010'))
console.log('101023', restoreIpAddresses('101023'))
function restoreIpAddresses(s) {
  const result = []
  const path = []

  function fn(s) {
    if (path.length === 3) {
      return isValidIpAddress(s) && result.push(path.concat(s))
    }
    for (let i = 1; i < s.length; i++) {
      const prev = s.substring(0, i) // 
      const rest = s.substring(i)
      if (!isValidIpAddress(prev)) continue // 前半段不合法 直接跳过此次循环
      path.push(prev)
      fn(rest)
      path.pop()
    }
  }
  fn(s)

  return result.map(texts => texts.join('.'))
}

/**
 * 有效 IP 地址 正好由四个整数
 *  （每个整数位于 0 到 255 之间组成，
 * 且不能含有前导 0），整数之间用 '.' 分隔。
 */
function isValidIpAddress(s) { // 
  if (s === '') return false
  const len = s.length
  if (len === 1) return true
  if (len > 3) return false
  if (s.substring(0, 1) === '0') return false
  if (s > 255) return false
  return true
}
