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
    if (mp[letter]) {
      stack.push(letter)
      stack.push(mp[letter])
      continue
    }

    if (stack[stack.length - 1] !== letter) {
      return false
    }
    stack.pop()
    stack.pop()
  }
  return stack.length === 0
}