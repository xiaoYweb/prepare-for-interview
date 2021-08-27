/**easy 删除字符串中的所有相邻重复项
 * 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

在 S 上 ((反复执行重复项删除操作)) ，直到无法继续删除。

在完成所有重复项删除操作后   返回最终的字符串。答案保证唯一

 */
const Stack = require('./Stack')

console.log('abbaca', removeDuplicates('abbaca'))
function removeDuplicates(s) {
  const stack = new Stack()
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (stack.peek() === char) {
      stack.pop()
      continue
    }
    stack.push(char)
  }
  return stack.toString()
}