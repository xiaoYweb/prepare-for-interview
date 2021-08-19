/**
 * 栈 先进后出 后进先出 lifo  last in first out
 * 在同一端 插入和删除  
 * 进栈 入栈 压栈 push
 * 出栈 弹栈 pop
 * 
 */

class Stack {
  constructor() {
    this.index = -1
  }
  push(val) {
    this[++this.index] = val
    return val
  }
  pop() {
    if (this.index < 0) return
    const val = this[this.index]
    delete this[this.index--]
    return val
  }
  size() {
    return this.index + 1
  }
  isEmpty() {
    return this.index === -1
  }
  peek() {
    if (this.isEmpty()) return
    return this[this.index]
  }
}

/**
 * 应用  
 * 1. 浏览器前进后端功能
 * 2. js函数执行栈
 */

/**
 * 有效的括号 LeetCode 20 
 */

/**
 * 栈的实现方式 
 * 按照存储结构不同  分为 顺序栈(数组)  链栈(链表)
 */

class ArrayStack {
  constructor(size = 1000) {
    this.maxLen = size;
    this.stack = []
    this.index = -1
  }
  push(val) {
    if (this.isFull()) return
    this.stack[++this.index] = val;
    return val
  }
  pop() {
    if (this.isEmpty()) return
    const val = this.peek()
    this.index--
    return val
  }
  peek() {
    return this.stack[this.index]
  }
  isEmpty() {
    return this.index === -1
  }
  isFull() {
    return this.index >= this.maxLen - 1
  }
}

function fn() {
  const stack = new ArrayStack(3)
  stack.push(1)
  stack.push(2)
  stack.push(3)
  stack.push(4)

  console.log('stack', stack)
  console.log('stack isFull', stack.isFull())
  console.log('stack peek', stack.peek())
  console.log('stack pop', stack.pop())
  console.log('stack pop', stack.pop())
  console.log('stack pop', stack.pop())
  console.log('stack pop', stack.pop())
  console.log('stack isEmpty', stack.isEmpty())
}

// fn()

/** leetcode 225
 * 用队列实现一个栈 
 * 
 */



/** leetcode 496
 * 下一个更大元素 I 
 */

/** 
 * 算数表达式
 * 1+2-3
 * 1+2*3
 * 数字 运算符
 * 
 * 前缀 中缀 后缀表达式 运算符的位置
 * 3+4-5
 * 前缀表达式 +-543 波兰表达式
 * 中缀表达式 3+4-5
 * 后缀表达式 34+5- 逆波兰表达式
 * 
 * LeetCode 150
 * 
 * 
 * 如何将中缀表达式 转化 为 后缀表达式
 * 
 * 1+((2+3)*4)-5
 * 元素     s2      s1运算符栈
 * 1        1       
 * +                +
 * (                + (
 * (                + ((
 * 2        1 2       
 * +                + (( +
 * 3        1 2 3   + (( +
 * )        123+    + (    
 * 遇到右括号 找到s1中的左括号 取中间元素 放入 s2栈
 * *        123+    + ( *
 * 4        123+4   + ( *
 * ）       123+4*   +
 * 遇到右括号 找到s1中的左括号 取中间元素 放入 s2栈
 * -        123+4*+   -
 * 5        123+4*+5  -
 * 当新运算符和栈顶运算符同一优先级的时候 取出栈顶元素 放入s2栈
 *          123+4*+5-
 * 没有元素了 s2栈中 的运算符 加入到s2中  s1最终的结果就是 后缀表达式
 */
// console.log(transfer('1+((2+3)*4)-5'))
// console.log(transfer('(4+(13/5))'))
// console.log(transfer('((2 + 1) * 3)'))
// console.log(transfer('((10 * (6 / ((9 + 3) * 11))) + 17) + 5'))
function transfer(str) {
  str = str.replace(/ /g, '')
  const list = str.replace(/[0-9]+/g, ($) => {
    return $ + '#'
  }).replace(/[\+\-\*\/\(\)]/g, ($) => {
    return $ + '#'
  }).split('#')
  list.pop()
  
  const s1 = new Stack() // 运算符栈
  const s2 = new Stack() // 中间结果栈
  for (let i = 0; i < list.length; i++) {
    const char = list[i];
    switch (char) {
      case '+':
      case '-':
      case '*':
      case '/':
        // 两种情况 
        // 1. s1为空 或者栈顶元素 是左括号
        // 2. 如果当前运算符 优先级比栈顶元素高
        while (true) {
          if (
            s1.isEmpty()
            || s1.peek() === '('
            || compare(char, s1.peek()) > 0
          ) {
            s1.push(char)
            break
          }
          // '+' -> '+-'  -> '-'
          s2.push(s1.pop())
        }
        break;
      case '(':
        s1.push(char)
        break;
      case ')':
        // 运算符栈s1中找到左括号位置 中间元素取出 存入 数据结果栈s2
        while (s1.peek() !== '(') {
          s2.push(s1.pop())
        }
        s1.pop() // 移除 '('
        break;
      default:
        s2.push(char) // 数字
        break;
    }
  }

  if (!s1.isEmpty()) {
    s2.push(s1.pop())
  }

  let i = s2.size()
  const result = new Array(i)

  while (i--) {
    result[i] = s2.pop()
  }
  return result
}

// 运算符优先级 1 a优先级高 -1 b优先级高  0 相等
function compare(a, b) {
  if (a === '+' || a === '-') {
    if (b === '*' || b === '/') {
      return -1
    }
    return 0
  }
  if (a === '*' || a === '/') {
    if (b === '+' || b === '-') {
      return 1
    }
    return 0
  }
}