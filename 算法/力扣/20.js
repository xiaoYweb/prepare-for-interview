/** easy 有效的括号  
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

  有效字符串需满足：

  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。

  输入：s = "()"
  输出：true

  输入：s = "()[]{}"
  输出：true

  输入：s = "(]"
  输出：false

  输入：s = "([)]"
  输出：false

  输入：s = "{[]}"
  输出：true
 */

/**
 * 通过栈来匹配出现的字符
 * 1. 如果是右括号 寻找栈顶元素  若匹配则弹出元素 继续操作 反之 则return false
 * 若果
 * 2. 如果是左括号 则 压入栈
 * 3. 遍历完成 为空栈 则匹配成功 反之 无效
 */

console.log('()', isValid('()'))
console.log('()[]{}', isValid('()[]{}'))
console.log('(]', isValid('(]'))
console.log('([)]', isValid('([)]'))
console.log('{[]}', isValid('{[]}'))
function isValid(s) {
  const stack = []
  const mp = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    if (mp[letter]) {
      stack.push(letter)
      continue
    }
    if (mp[stack[stack.length - 1]] !== letter) {
      return false
    }
    stack.pop()
  }
  return stack.length === 0
}

/**
 * 当出现左括号 直接存入右括号 
 * 出现右括号 取出栈顶元素 进行匹配
 */
function isValid(s) {
  const stack = []
  const mp = {
    '(': ')',
    '{': '}',
    '[': ']',
  }

  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    if (mp[letter]) { // 当出现左括号 直接存入 左、右括号 
      stack.push(letter)
      stack.push(mp[letter])
      continue
    }

    if (stack[stack.length - 1] !== letter) { // 出现右括号 且不与栈顶元素相等
      return false
    }
    // 出现右括号 取出栈顶元素 进行匹配
    stack.pop()
    stack.pop()
  }
  return stack.length === 0
}

function isValid(s) {
  if (s === '') return true
  const stack = []
  const mp = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (mp[char]) { // 出现左括号
      stack.push(char)
      continue
    }
    // 出现右括号
    const lastItem = stack[stack.length - 1]
    if (char !== mp[lastItem]) return false // 与前一项不等 直接放回false
    // 与前一项相等
    stack.pop()

  }
  return stack.length === 0
}